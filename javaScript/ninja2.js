function Ninja(name) {
    var self = this;
    var speed = 3;
    var strength = 3;
    this.name = name;
    this.health = 100;
    this.sayName = function () {
        console.log("My ninja name is" + this.name);
    };
    this.showStats = function () {
        console.log("Name: " + this.name,"Health :"  +this.health, "Speed:"+ speed , "Strength: " + strength);
    };
    this.drinkSake = function () {
        this.health+=10
    };
    this.punch = function (ninja) {
        this.ninja = ninja;
        ninja.health-=5;
        console.log(ninja.name," was punched by "  +this.name, "and lost 5 Health!");


        
    };
    this.kick = function (ninja) {
        if (ninja instanceof Ninja) {
        var lost = strength*15;
        console.log(strength)
        ninja.health= ninja.health - lost;
        console.log(ninja.name," was kicked by "  +this.name, "and lost "+lost ," Health!");  
        }
        else {
			console.log(`Not a ninja!`);}
    };

}
var ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
// -> "My ninja name is Hyabusa!"
ninja1.drinkSake();
ninja1.showStats();
// -> "Name: Hayabusa, Health: 100, Speed: 3, Strength: 3"

var blueNinja = new Ninja("Goemon");
var redNinja = new Ninja("Bill Gates");
redNinja.punch(blueNinja);
blueNinja.showStats();

blueNinja.kick(redNinja);
redNinja.showStats();
