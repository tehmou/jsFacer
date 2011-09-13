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

            define: function (name, interface, override) {
                if (!override && this.isDefined(name)) {
                    throw "Interface \"" + name + "\" was already defined!";
                }
                this.interfaces[name] = interface;
            },

            isDefined: function (name) {
                return this.interfaces.hasOwnProperty(name);
            },

            check: function (object, interface, acceptNull) {
                var realInterface = _.isString(interface) ? this.interfaces[interface] : interface;
                var passed = true;
                var types = this.types;

                _.each(realInterface, function (value, index) {
                    passed = passed && object.hasOwnProperty(index) && ((acceptNull && object[index] === null) || types[value](object[index]));
                });
                return passed;
            },

            assert: function (object, interface, acceptNull) {
                if (!this.check.apply(this, arguments)) {
                    throw "Object failed to implement interface \"" + interface + "\"!";
                }
            }
        });
        return base;
    }
};

jsFacer.create(jsFacer);