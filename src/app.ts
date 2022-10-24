//TS auto types it but can also manual type the datatype ex: a:string
//If you want to assign it to another value, it must be a string only

//ex: a:1 will cause an error because TS wants a string (TYPES STAY consistent)
let a:string = 'foo'
a = "hello"

/* ******************* */

//TS functions
//setting up functions with data types on parameters makes less errors to understand what inputs need to be
const getDogName = (name: string, type: string): string => { //<-- :string tells func/devs that string is the output (makes it more strict)
    return `My name is ${name} and I am a ${type}.` 
}

// getDogName('Dexter', 'Must Be String')

/* ******************* */

//TS Interface - an entity in TS to have a premade object build for specific types already (pre defined)
//TS interface has great auto complete feature as well

interface IUser { //use IUser or UserInterface for interfaces name so it won't confuse/conflict with classnames
    name: string,
    age?: number // putting a question mark syntax makes this property not mandatory for input
    sayHello(): string //function/method for IUser and must return string
}

//specifying type for objects (Can pass this to other objects that set this property or second/third/etc users)
const user: {name:string, age:number} = {
    name: "dexter", 
    age: 1
}
//instead of copying the types over and over we use an interface to define this specific object so no repeated code
const user2: IUser = { 
    name: "dexter",
    sayHello() {
        return 'hello' + user2.name
    }
}

/* ******************* */

//Types and Unions

//Union operators - assigning values to different types.
//this variable can be both data types an default to '1'
let pageNumber: string | number = '1' 

//Use default values when assigning variables that have union data types because it becomes undefined as good practice
let errorMessage: string | null = null

//we can combined our UserInterface with union as well
//TIP: When using unions, don't over fill them with different types, that's bad code
let ourUser: IUser | null = null

//example use of unions
ourUser = {
    name: "Daxter",
    sayHello(){
        return "hello"
    }
}

//Type aliases - create types to be able to use inside TS entities ex: interfaces
//capitalize for better readability
type ID = string
type PopularDog = string
type MaybePopularDog = PopularDog | null //custom type can also just do conventional string or other types unions

interface Dog {
    id: ID, //<-- example type use inside an interface (makes it unique)
    name: string,
    dogType: string
}

const popularDogs: PopularDog[] = ['Dexter', 'Must be string because of type', null, undefined]
const popularDogs2: string[] = [null, 'Must be string because of type']
const ourDogs: MaybePopularDog = 'yolo' || null

/* ******************* */
//TYPES in TS

//Void in TS
//When nothing is returned example: in function, TS understands it as void
//Void is a set of undefined and null

const doSomething = ():void => {
    console.log('do something')
}

//Any type in TS, worse type in TS
//returns any types
//last resort to fix errors in TS (NOT A SOLUTION!)

let foo: any = "any"
console.log(foo.any()) //<-- no error because TS does not care about it when type is any


//Never type is TS (not so popular)
//Never executes

const neverRuns = (): never => { //can't be returned
    throw Error
}

//Unknown Type in TS
//great alternative to 'any' type
//cant be assigned directly to other types
//must convert unknown to another data type in order for it to work

let vAny: any = 1
let vUnknown: unknown = "1"

let s1: string = vAny //works anyways because of any

//Type assertion in TS
//convert one type to another

let someArr: string= "Hello"
let s2: string = vUnknown as string //<-- converting the unknown to string type 
//Here is a more complex type assertion
let testThis: number = vUnknown as number
let testThis2: number = someArr as unknown as number //<-- type assertion on different variables from string -> unknown -> number

/* ******************* */

//TS with Dom
//makes this a generic input when used -> has methods available on autocomplete
//use as operator in DOM because TS does not have access to markup(HTML)
//define correct type of dom elements
const someElement = document.querySelector('.foo');

someElement.addEventListener('click', (e)=> {
    const target = e.target as HTMLInputElement
    console.log(target.value)
})

/* ******************* */

//Classes in TS
//public, private, and protected
//Everything is public by default
//These P's only exist is TS
//public - accessible anywhere outside of class
//private - only accessible to the class itself
//protected - only allowed in class and it's children (inheritance)

//Defining Interfaces with Classes (must implement interface first)
interface UserInterface {
    //whatever interfaces we input must be public for classes
    getFullName(): string //<-- The class User must create this function in order for it work. Like a schema.
}

class User implements UserInterface { //<-- must apply implements
    private firstName: string //<-- private can only use inside the User class (if in UserInterface can't be private)
    public lastName: string  //<-- new instatiated User class can access public
    protected protectedDog: string //<-- only allowed in class and inheritance
    readonly dogNames: string //<-- cant change this

    constructor(firstName:string, lastName:string){
        this.firstName = firstName
        this.lastName = lastName
        this.dogNames = firstName
    }
    getFullName():string{
        return `${this.firstName} ${this.lastName}`
    }
    static readonly maxAge: number = 50 //<-- static example
}

const newUser = new User('Dexter', 'Lexter')

//Inheritance (Admin has access to User constructor)

class Admin extends User {
    private editor: string

    setEditor(editor:string):void {
        this.editor = editor
    }
    getEditor():string {
        return this.editor
    }
}

const newAdmin = new Admin('Daxter', 'Laxter')

/* ******************* */

//Generics interfaces and functions in TS
interface NewUserInterface<T>{ //<-- CAN ADD MULTIPLE GENERICS <T, V, C> and define them inside
    name: string,
    age: number,
    data: T //<-- can pass in generic data inside like string[], meta: string
}

//<T> is a generic datatype (So whatever is passed in it, makes it that datatype/s)ex: interfaces
//You can extend it to define the generic needs an object to be passed in by default
const addId = <T extends object>(obj: T) => { //<-- must be an object
    const id = Math.random().toString(16)
    return {
        ...obj,
        id
    }
}

const newDog: NewUserInterface<{meta: string}> = {//<-- must add properties from NUI (satisfies object to be passed in addId)
    name: "Dexter",
    age: 4,
    data: { //<-- the data interface defined on interface. The generic we passed in on this specific variable is an object as key + a string as a value
        meta: 'yolo'
    }
}

//ex #2
const newDog2: NewUserInterface<string[]> = {//<-- must add properties from NUI (satisfies object to be passed in addId)
    name: "Dexter",
    age: 4,
    data: ['1', '2', '3'] //<-- here we pre defined out generic to be an array of strings as our data
}



//What if you pass a random object to this? (Still must follow directly under NUI interface)
//must define the generic inside function NUI as well. (Must identify the exact same types when passed in)
const res = addId<NewUserInterface<string[]>>(newDog2) //<-- This function explicity needs to use NUI properties if you want it to work

//Enums in TS
//Best practice to prefix/suffix enums = Enums ex: TaskEnum for readability
//Capital letter is best practice for enumerals
enum StatusEnum {
    NotStarted = "0", //<-- only way to assign values to enums is with = sign (don't confuse it with objects:)
    InProgress = "1",
    Done = "2"
}
//It is common to use enums inside interfaces
interface Task {
    id: number,
    name: boolean,
    status: StatusEnum //<-- an enum used inside interface
}

//Can use enums as value and data type ex:
let NotStartedStatus: StatusEnum = StatusEnum.NotStarted //<-- can't be reasigned any values other than Status properties:
// NotStartedStatus = 'foo'
NotStartedStatus = StatusEnum.InProgress //<-- can only change from enum objects