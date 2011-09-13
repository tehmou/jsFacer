jsFacer
=======

A lightweight utility for checking if an object fulfills a defined interface. The only dependency is underscore.js, and Jasmine for tests.


Interface objects
---------------------

Define a property-type hash to use as the definition. The supported types are function, array, string, boolean, number and any. See below for defining your own types or removing the existing ones.

    var iDuck = {
        quack: "function",
        color: "string",
        canFly: "boolean"
    };


Checking against an interface object
-----------------------------

    var duck = {
        quack: function () { alert("quack!"); },
        color: "#ffe000",
        canFly: true
    };

    var amIDuck = jsFacer.check(duck, iDuck); // true


Defining and using named interfaces
-----------------

Using jsFacer.define lets you save the interface with the name you specify in the first argument. You can then use this name elsewhere instead of the actual interface object.

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


Defining and modifying property types
------------------

You can also define your own types with checking functions that return either true of false. The function gets the value of the property as its first argument.

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


Asserts
-------

If you want an error to be thrown when the interface does not match, use jsFacer.assert.

    jsFacer.assert(duck, "iDog"); // Throw an error


Creating instances of jsFacer
-----------------------------

Sometimes you may want to create a new instance of jsFacer--for instance, if you want to be sure no one mess with your interface definitions.

    (function () {

        var mySecretJSFacer = jsFacer.create();
        mySecretJSFacer.define("iSecretInterface", {
            dontShowToAnyone: "any"
        });

    })();

    jsFacer.isDefined("iSecretInterface"); // false


