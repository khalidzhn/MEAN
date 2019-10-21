function personConstructor(name, age) {
    var self = this;
    this.name = name;
    this.age = age;
    var privateVariable = "This variable is private";
    var privateMethod = function() {
        console.log("this is a private method for " + self.name);
        console.log(self);
    }

    this.greet = function(){
        console.log("Hello my name is " + this.name + " and I am " + this.age + " years old!");
        console.log("Also my privateVariable says: " + privateVariable)
        privateMethod();

    }
    // we can access our methods within the constructor!
}

/* var steve = new personConstructor("Steve", 27);
steve.greet();

var anika = new personConstructor("Anika", 33);
anika.greet();

var emily = new personConstructor("Emily", 22);
emily.greet = function() {
    console.log("I am the greatest, ever!");
};
emily.greet();

var anika = new personConstructor('Anika', 34);
anika.greet();
     */

    var MyObjConstructor = function(name) {
        var myPrivateVar = "Hello"; // just to show that it is difficult to see this private var
        this.name = name; // but you can see the name!
        this.method = function() {
          console.log( "I am a method");
        };
      }
   /*    var obj1 = new MyObjConstructor('object1');
      var obj2 = new MyObjConstructor('object2');
      console.log(obj1);
obj1.newProperty = "newProperty!";
obj1.__proto__.anotherProperty = "anotherProperty!";
console.log(obj1.anotherProperty); // anotherProperty!
console.log(obj1.newProperty); // newProperty!
// What about obj2?
console.log(obj2.newProperty); // undefined
console.log(obj2.anotherProperty); // anotherProperty! <= THIS IS THE COOL PART!
 */

function Cat(catName) {
    var name = catName;
    this.getName = function() {
      return name;
    };
  }
  //adding a method to the cat prototype
  Cat.prototype.sayHi = function() {
    console.log('meow');
  };
  //adding properties to the cat prototype
  Cat.prototype.numLegs = 4;
  var muffin = new Cat('muffin');
  var biscuit = new Cat('biscuit');
  console.log(muffin, biscuit);
  //we access prototype properties the same way as we would access 'own' properties
  muffin.sayHi();
  biscuit.sayHi();
  console.log(muffin.numLegs);
  // we may change an instance's attributes rather than keeping the value set by prototype
  muffin.numLegs = 3;
  muffin.__proto__.numLegs ++;
  console.log(muffin.numLegs);
  console.log(biscuit.numLegs);
  console.log(muffin.__proto__.numLegs)

  // poor mutant cats: muffin.__proto__.numLegs ++;
  // doing this to muffin will cause all the cats to have 5 legs, but muffin will still have 3 legs
  