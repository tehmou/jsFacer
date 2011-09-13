describe("jsFacer", function () {
    var completeInterface, originalValidTestObject, _jsFacer;

    beforeEach(function () {
        _jsFacer = jsFacer.create();
        completeInterface = {
            myFunction: "function",
            myArray: "array",
            myString: "string",
            myBoolean: "boolean",
            myNumber: "number",
            myObject: "any"
        };
        originalValidTestObject = {
            myFunction: function () { },
            myArray: [],
            myString: "string",
            myBoolean: false,
            myNumber: 52356,
            myObject: {}
        };
    });

    describe("Testing valid objects", function () {
        
        it("Should pass all known types", function () {
            _jsFacer.assert(originalValidTestObject, completeInterface);
        });

        it("Should allow all types for type any", function () {
            var validTestObject;
            _.each(completeInterface, function (value, index) {
                validTestObject = _.clone(originalValidTestObject);
                validTestObject.myObject = originalValidTestObject[index];
                _jsFacer.assert(validTestObject, completeInterface);
            });
        });
    });

    describe("Throwing errors", function () {

        it("Should fail if one property is unimplemented", function () {
            var errorThrown, invalidTestObject;
            _.each(originalValidTestObject, function (value, index) {
                errorThrown = false;
                invalidTestObject = _.clone(originalValidTestObject);
                delete invalidTestObject[index];
                try {
                    _jsFacer.assert(invalidTestObject, completeInterface);
                } catch (e) {
                    errorThrown = true;
                }
                expect(errorThrown).toBeTruthy();
            });
        });

        it("Should fail if one property is of wrong type", function () {
            var errorThrown, invalidTestObject, lastValue = "not a function";
            _.each(originalValidTestObject, function (value, index) {
                if (completeInterface[index] === "any") {
                    return;
                }
                errorThrown = false;
                invalidTestObject = _.clone(originalValidTestObject);
                invalidTestObject[index] = lastValue;
                try {
                    _jsFacer.assert(invalidTestObject, completeInterface);
                } catch (e) {
                    errorThrown = true;
                }
                expect(errorThrown).toBeTruthy();
                lastValue = value;
            });
        });

        it("Should not allow null by default", function () {
            var errorThrown, invalidTestObject;
            _.each(originalValidTestObject, function (value, index) {
                if (completeInterface[index] === "any") {
                    return;
                }
                errorThrown = false;
                invalidTestObject = _.clone(originalValidTestObject);
                invalidTestObject[index] = null;
                try {
                    _jsFacer.assert(invalidTestObject, completeInterface);
                } catch (e) {
                    errorThrown = true;
                }
                expect(errorThrown).toBeTruthy();
            });
        });
    });
    
    describe("Saving interfaces with name", function () {

        it("Should not yet have myInterface defined", function () {
            expect(jsFacer.isDefined("myInterface")).toBeFalsy();
        });

        describe("Testing myInterface", function () {
            beforeEach(function () {
                _jsFacer.define("myInterface", completeInterface);
            });

            it("Should read the saved interface", function () {
                expect(_jsFacer.isDefined("myInterface")).toBeTruthy();
                _jsFacer.check(originalValidTestObject, "myInterface");
            });

            it("Should not allow overriding an interface already defined", function () {
                var errorThrown = false;
                try {
                    _jsFacer.define("myInterface", {});
                } catch (e) {
                    errorThrown = true;
                }
                expect(errorThrown).toBeTruthy();
            });

            it("Should allow overriding an interface if forced", function () {
                _jsFacer.define("myInterface", {}, true);
            });
        });
    });

});