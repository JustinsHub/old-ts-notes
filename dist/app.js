//TS auto types it but can also manual type the datatype ex: a:string
//If you want to assign it to another value, it must be a string only
//ex: a:1 will cause an error because TS wants a string (TYPES STAY consistent)
var a = 'foo';
a = "hello";
/* ******************* */
//TS functions
//setting up functions with data types on parameters makes less errors to understand what inputs need to be
var getDogName = function (name, type) {
    return "My name is " + name + " and I am a " + type + ".";
};
//specifying type for objects (Can pass this to other objects that set this property or second/third/etc users)
var user = {
    name: "dexter",
    age: 1
};
//instead of copying the types over and over we use an interface to define this specific object so no repeated code
var user2 = {
    name: "dexter",
    sayHello: function () {
        return 'hello' + user2.name;
    }
};
/* ******************* */
//Types and Unions
//Union operator 
//this variable can be both data types an default to '1'
var pageNumber = '1';
//Use default values when assigning variables that have union data types because it becomes undefined as good practice
var errorMessage = null;
//we can combined our UserInterface with union as well
var ourUser = null;
//# sourceMappingURL=app.js.map