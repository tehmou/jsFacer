jsFacer 0.1.2
=============

A lightweight utility for interface-like behavior in JavaScript. Depends on [underscore.js](http://documentcloud.github.com/underscore/), and [Jasmine](http://pivotal.github.com/jasmine/) for tests.


Usage
-----


### Defining an interface

    var iDuck = {
        quack: "function",
        color: "string",
        canFly: "boolean"
    };

This will match any object that has properties quack, color and canFly, of corresponding types function, string and boolean.


### Checking against an interface

    var duck = {
        quack: function () { alert("quack!"); },
        color: "#ffe000",
        canFly: true
    };

    var amIDuck = jsFacer.check(duck, iDuck); // true


### Defining and using named interfaces

Using jsFacer.define lets you save the interface with the name you specify in the first argument. You can then use this name elsewhere as a string, instead of the actual interface object.

    jsFacer.define("iDog", {
        bark: "function",
        color: "string",
        canCatchFrisbee: "boolean"
    });

    var dog = {
        bark: function () { alert("wuf!"); },
        color: "#904000",
        canCatchFrisbee: true
    };

    var amIDog = jsFacer.check(dog, "iDog"); // true
    var amIDogToo = jsFacer.check(duck, "iDog"); // false


### Masking object with an interface

You can create a masked object based on an interface. This essentially exposes only the fields that are defined in the interface.

    jsFacer.define("iBarker", {
        bark: "function"
    });

    var barker = jsFacer.mask(dog, "iBarker");

All functions of the masked object are bound to the original object with _.bind. Use { bind: false } as the third argument to disable this.

    var lassie = {
        bark: function () { alert("I am " + this.name + "!"; },
        name: "Lassie"
    };

    var talkingDog = jsFacer.mask(lassie, "iBarker");
    talkingDog.bark(); // Shows "I am Lassie!"
    // talkingDog.name is not defined


### How property matching works

For checking which is which, underscore.js utilities are used:

    types: {
        "function": _.isFunction,
        "array": _.isArray,
        "string": _.isString,
        "boolean": _.isBoolean,
        "number": _.isNumber,
        "any": function () { return true; }
    }

You can modify these or define your owns in jsFacer.types. The match function is given the value to match in the first argument, and it is expected to return either true or false.

    jsFacer.types["isMurre"] = function (value) {
        return value === "Murre";
    };

    jsFacer.define("iMurreMatcher", {
        name: "isMurre"
    });

    var murre = {
        name: "Murre"
    };

    var randomDog = {
        name: "Poodle"
    };

    jsFacer.check(murre, "iMurreMatcher"); // true
    jsFacer.check(randomDog, "iMurreMatcher"); // false


### Asserts

If you want an error to be thrown when the interface does not match, use jsFacer.assert.

    jsFacer.assert(duck, "iDog"); // Throw an error


### Creating new instances of jsFacer

Sometimes you may want to create a new instance of jsFacer--for instance, if you want to be sure no one mess with your interface definitions.

    (function () {

        var mySecretJSFacer = jsFacer.create();
        mySecretJSFacer.define("iSecretInterface", {
            dontShowToAnyone: "any"
        });

    })();

    jsFacer.isDefined("iSecretInterface"); // false


Installation
------------

Download [underscore.js](http://documentcloud.github.com/underscore/) and [jsfacer.js](https://github.com/downloads/tehmou/jsFacer/jsfacer-0.1.1.js), and include them in your project.

    <script type="text/javascript" src="underscore.js"></script>
    <script type="text/javascript" src="jsfacer.js"></script>
