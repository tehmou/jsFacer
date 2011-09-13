var jsFacer = {
    
    interfaces: {},
    
    types: {
        "function": _.isFunction,
        "array": _.isArray,
        "string": _.isString,
        "boolean": _.isBoolean,
        "number": _.isNumber,
        "object": function () { return true; }
    },

    define: function (name, interface) {
        if (this.interfaces.hasOwnProperty(name)) {
            throw "Interface " + name + " was already defined!";
        }
        this.interfaces[name] = interface;
    },

    check: function (object, interface) {
        var realInterface = _.isString(interface) ? this.interfaces[interface] : interface;
        var passed = true;

        _.each(realInterface, function (value, index) {
            passed = passed && object.hasOwnProperty(index) && value(object[index]);
        });
        
        if (!passed) {
            throw "Object failed to implement interface " + interface + "!";
        }
    }
};