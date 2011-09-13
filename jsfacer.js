//     jsFacer.js 0.1.1
//     (c) 2011 Timo Tuominen
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/tehmou/jsFacer

var jsFacer = {
    create: function (base) {
        base = base || {};
        _.extend(base, {
            interfaces: {},
            types: {
                "function": _.isFunction,
                "array": _.isArray,
                "string": _.isString,
                "boolean": _.isBoolean,
                "number": _.isNumber,
                "any": function () { return true; }
            },

            define: function (name, interface, options) {
                options = options || {};
                if (!options.override && this.isDefined(name)) {
                    throw "Interface \"" + name + "\" was already defined!";
                }
                this.interfaces[name] = interface;
            },

            isDefined: function (name) {
                return this.interfaces.hasOwnProperty(name);
            },

            findInterface: function (interface) {
                return _.isString(interface) ? this.interfaces[interface] : interface;
            },

            check: function (object, interface) {
                var realInterface = this.findInterface(interface);
                var passed = true;
                var types = this.types;

                _.each(realInterface, function (value, index) {
                    passed = passed && object.hasOwnProperty(index) && types[value](object[index]);
                });
                return passed;
            },

            assert: function (object, interface) {
                if (!this.check.apply(this, arguments)) {
                    throw "Object failed to implement interface \"" + interface + "\"!";
                }
            },

            mask: function (object, interface, options) {
                options = options || { assert: true, bind: true };
                if (options.assert) {
                    this.assert.apply(this, arguments);
                }
                var realInterface = this.findInterface(interface);
                var masked = {};
                _.each(realInterface, function (value, index) {
                    masked[index] = object[index];
                    if (options.bind && _.isFunction(masked[index])) {
                        masked[index] = _.bind(masked[index], object);
                    }
                });
                return masked;
            }
        });
        return base;
    }
};

jsFacer.create(jsFacer);