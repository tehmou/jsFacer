jsFacer
=======

A lightweight utility for checking if an object fulfills a defined interface.

Defining an Interface
---------------------

Define a property-type hash to use as the definition. The supported types are

"function"
"array"
"string"
"boolean"
"number"
"any"

    var iDuck = {
        quack: "function",
        color: "string",
        canFly: "boolean"
    };


Checking Against an Interface
-----------------------------

    var duck = {
        quack: function () { alert("quack!"); },
        color: "#ffe000",
        canFly: true
    };

    var amIDuck = jsFacer.check(duck, iDuck); // true


Naming Interfaces
-----------------

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


Asserts
-------

If you want an error to be thrown when the interface does not match, use jsFacer.assert.

    jsFacer.assert(duck, "iDog"); // Throw an error


Defining Own Types
------------------

You can also define your own checkers for properties in an interface. Just define a new function in jsFacer.types and use its key in your interfaces.

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


Creating Instances of jsFacer
-----------------------------

Sometimes you may want to create a new instance of jsFacer--for instance, if you want to be sure no one mess with your interface definitions.

    (function () {
        var mySecretJSFacer = jsFacer.create();
        mySecretJSFacer.define("iSecretInterface", {
            dontShowToAnyone: "any"
        });
    })();

    jsFacer.isDefined("iSecretInterface"); // false
