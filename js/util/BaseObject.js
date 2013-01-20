// http://uxebu.com/blog/2011/02/23/object-based-inheritance-for-ecmascript-5/

var BaseObject = {
    create: function create() {
       var instance = Object.create(this);
       instance._construct.apply(instance, arguments);
       return instance;
    },

    extend: function extend(properties, propertyDescriptors) {
        propertyDescriptors = propertyDescriptors || {};

        if(properties){
            var simpleProperties = Object.getOwnPropertyNames(properties);
            for (var i = 0, len = simpleProperties.length; i < len; i += 1) {
                var propertyName = simpleProperties[i];
                if(propertyDescriptors.hasOwnProperty(propertyName)) {
                    continue;
                }

                propertyDescriptors[propertyName] =
                    Object.getOwnPropertyDescriptor(properties, propertyName);
            }
        }

        return Object.create(this, propertyDescriptors);
    },

    _construct: function _construct() {},

    _super: function _super(definedOn, methodName, args) {
        var test = definedOn.constructor.name;
        if (typeof methodName !== "string") {
            args = methodName;
            methodName = "_construct";
        }

        return Object.getPrototypeOf(definedOn)[methodName].apply(this, args);
    }
};


/*

// Example use 1:

var baseObject = {
    foo: "some property",
    bar: function() {
       return "some method";
    }
}

var myObject = Object.create(baseObject);
var mySecondObject = Object.create(baseObject);



// Example use 2:

var Person = {
    firstName: null, // the person’s first name
    lastName: null // the person’s last name
};

// “subclass” Person
var Employee = Object.create(Person, {
    id: { // the employees’s id
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    }
});

// create an instance of Employee
var david = Object.create(Employee);
david.firstName = "David";
david.lastName = "Aurelio";
david.id = 1;

// “subclass” Employee
var Manager = Object.create(Employee, {
    department: { // the manager’s department
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    }
});

// create an instance of Manager
var tobias = Object.create(Manager);
tobias.firstName = "Tobias";
tobias.lastName = "von Klipstein";
tobias.id = 0;
tobias.department = "Infrastructure";

*/