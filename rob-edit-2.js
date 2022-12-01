// Define images for each type of pet
let crocImages = ["pics/croc-happy.jpg","pics/croc-unhappy.jpg","pics/croc-lastlegs.jpg","pics/croc-dead.jpg"];
let bunnyImages = ["pics/bunny-happy.jpg","pics/bunny-unhappy.jpg","pics/bunny-lastlegs.jpg","pics/bunny-dead.jpg"];
let dogImages = ["pics/dog-happy.jpg","pics/dog-unhappy.jpg","pics/dog-lastlegs.jpg","pics/dog-dead.jpg"];
let catImages = ["pics/cat-happy.jpg","pics/cat-unhappy.jpg","pics/cat-lastlegs.jpg","pics/cat-dead.jpg"];

//console.log(dogImages);

// Class for defining the type of pet, with a characteristic temperament
class PetType {
    constructor (species, affectionate, irritable, lazy, scruffy, greedy, images) {
        //console.log(`Constructing a ${species}`);
        
        // This is a string
        this.species = species;
        // All these are simple numbers between 1 and 10
        // They define the temperament of the animal
        this.affectionate = affectionate;
        this.irritable = irritable;
        this.lazy = lazy;
        this.scruffy = scruffy;
        this.greedy = greedy;
        // An array of images, reflecting four different moods
        this.pics = images;
    }
}

//console.log("Defined constructor for PetType");

// Define some types of pets, complete with temperaments, as global variables.
let croc = new PetType("crocodile", 1,10,7,5,8, crocImages);
//console.log("Defined croc");
let bunny = new PetType("woodland bunny", 10,1,2,8,10, bunnyImages);
//console.log("Defined bunny");
let dog = new PetType("dog", 8,3,2,9,7, dogImages);
//console.log("Defined dog");
let cat = new PetType("cat", 6,8,8,2,8, catImages);
//console.log("Defined cat");

//console.log("Defined some pet types");

// Use this class to keep track of the mood of the pet
class Mood {
    constructor (hungry, bored, dirty, angry, tired){
        // All these are simple numbers between 1 and 100
        // These are dynamic state vars, so all get set by functions as the program runs
        this.hungry = hungry;
        this.dirty = dirty;
        // When the pet is exercised, bored goes down but tired goes up
        this.bored = bored;
        this.tired = tired;
        // This gets computed from the other four
        // If it goes above <insert number here> the owner gets bitten!
        this.angry = angry;
    }
}


class Cyberpet {
    constructor (name, type) {
        
    console.log(`Constructing a ${type.species} called ${name}`);
        
    this.name = name,
    this.type = type, // PetType object: so far croc, bunny, dog or cat

    // mood gets calculated by status functions, and also gets referenced/queried by status functions
    // some status functions might bite the user, depending on result, to add a bit of a risk factor
    this.mood = new Mood(50, 50, 50, 50, 50), 

    // health gets worked out last
    // Only needs to be a simple number
    this.health = 100 // This could be made into a virtual attribute, I think.
    this.scorevar = 0; // Use getter and setter methods for this var.

    this.pic = type.pics[0]; // This is always the correct pic to show. Start off happy.
    
    console.log(`Construction complete! The pic is ${this.pic}`);
    
    }

    //
    // GETTERS AND SETTERS
    // use this.score to reference Cyberpet.scorevar
    //
    get score() {
        // Do funky stuff here
        return this.scorevar;
    }
    set score(tmpvar) {
        // Do funky stuff here
        this.scorevar = tmpvar;
    }
    
    //
    // ACTION FUNCTIONS:
    //

    //changes feed false to true, adds 10 health-capped at 100
    feedPet () {
        //this.feed = true;
        this.mood.hungry -= 2 * this.type.greedy;
        this.mood.tired -= 2 * this.type.lazy;
        this.mood.angry -= 100;

        this.mood.angry = this.mood.hungry + this.mood.bored + this.mood.tired + this.mood.dirty;
        this.mood.angry *= Math.floor(this.type.irritable/3)+1;

        this.health += 10 - Math.floor(this.mood.tired / 10);
        if (this.health > 100) {
            this.health -= 20;
            console.log(`${this.name} is being overfed and getting overweight!`);
        }

        setReadouts();

    }

    //changes clean false to true, adds 10 health-capped at 100
    cleanPet () {
        //this.clean = true;
        this.mood.dirty -= 2 * this.type.scruffy;
        this.mood.tired += 3 * this.type.lazy;

        this.mood.angry = this.mood.hungry + this.mood.bored + this.mood.tired + this.mood.dirty;
        this.mood.angry *= Math.floor(this.type.irritable/3)+1;

        if (this.mood.angry > 500) {
            this.score -=100;
            console.log(`Ouch! ${this.name} the ${this.type.species} just bit you!`);
            console.log(`Maybe you should feed him?`);
        }

        this.health += 10 - Math.floor(this.mood.tired / 10);
        if (this.health > 100) { 
            this.health = 100;
            console.log(`${this.name} is now really, really clean, and in perfect health!`);
        }

        setReadouts();
        
    }    

    //changes play false to true, adds 10 health-capped at 100 /// may modify for dog/not dog
    playWithPet () {
        //this.play = true;
        this.mood.bored -= 2 * this.type.affectionate;
        this.mood.tired += 3 * this.type.lazy;

        this.mood.angry = this.mood.hungry + this.mood.bored + this.mood.tired + this.mood.dirty;
        this.mood.angry *= Math.floor(this.type.irritable/3)+1;

        if (this.mood.angry > 500 && this.mood.tired > 70) {
            this.score -= 100;
            console.log(`Ouch! ${this.name} the ${this.type.species} just bit you!`);
            console.log(`Maybe play with him later?`);
        }

        this.health += 10 - Math.floor(this.mood.tired / 10);
        if (this.health > 100) { 
            this.health = 100;
            console.log(`${this.name} is so healthy he doen't really need any more play, but what the heck.`)
        }

        setReadouts();
       
    }

    //
    // TIMER FUNCTIONS:
    //
    tick() {
        // Gets called regularly by a timer and modifies this.health.
        console.log("Ticking...");

        // Adapted from Digby's code
        setTimeout(() => {
            console.log("Running tick handler...");

            this.mood.hungry += 10;
            this.mood.dirty += 10;
            this.mood.bored += 10;
            this.mood.tired += 10;
            this.mood.angry += 10;
            
            this.health -=10;
            this.score += this.health;
            
            if (this.health < 80) this.pic = this.type.pics[0];
            else if (this.health < 50) this.pic = this.type.pics[1];
            else if (this.health < 15) this.pic = this.type.pics[2];
            else if (this.health < 1) this.pic = this.type.pics[3];
            else this.pic = pic[this.type.pics.length];
                   
            setReadouts();
            
            }, 5000);
    }

    // Still not sure what to do here. Need to call the function somewhere.
    // Not from the terminal though, since need 'window' to be defined.
    
    //this.tick();

}


/*  COPIED HERE FROM .HTML FILE FOR REFERENCE:
            <div id="hungry-readout">hungry: 50</div>
            <div id="clean-readout">dirty: 50</div>
            <div id="bored-readout">bored: 50</div>
            <div id="tired-readout">tired: 50</div>
            <div id="angry-readout">angry: 50</div>
*/


function setReadouts() {
    //console.log("Setting Readouts");
    document.getElementById("hungry-readout").textContent = `Hungry: ${myPet.mood.hungry}`;
    document.getElementById("clean-readout").textContent = `Clean: ${myPet.mood.clean}`;
    document.getElementById("bored-readout").textContent = `Bored: ${myPet.mood.bored}`;
    document.getElementById("tired-readout").textContent = `Tired: ${myPet.mood.tired}`;
    document.getElementById("angry-readout").textContent = `Angry: ${myPet.mood.angry}`;

    // Also print out 'bite messge' and 'health message'

    // Also print out 'score'

    // Also set the current display picture from 'this.pic'
    document.getElementById("pet-image").src = myPet.pic;

}


///////// hiding name-input, game space ///////////////
giveNameHeader.style.display = "none"
nameInputter.style.display = "none"
game.style.display = "none"
///////// hiding name-input, game space ///////////////

////////// animal selection from choosePet.html START ///////////

// This gets run when the script first gets loaded, for debugging
let animalSelect = bunny;

// These get run when the script first gets loaded
// Good for debugging!
let petName = "Placeholder";
let myPet = new Cyberpet(petName,animalSelect);


function doGameSetup() {
    choosePetGrid.style.display = "none";
    choosePetTitle.style.display = "none";
    giveNameHeader.style.display = "";
    nameInputter.style.display = "";
    myPet.pic = myPet.type.pics[0];

    // Set the pet image here for the first time
    document.getElementById("pet-image").src = myPet.pic;
}

const dogSelect = document.getElementById("select-dog");
dogSelect.addEventListener("click", () => {
    animalSelect = dog;
    doGameSetup();
    console.log(`You have selected a ${animalSelect.species}`);

//     choosePetGrid.style.display = "none";
//     choosePetTitle.style.display = "none";
//     giveNameHeader.style.display = ""
//     nameInputter.style.display = ""
})
   
const catSelect = document.getElementById("select-cat");
catSelect.addEventListener("click", () => {
    animalSelect = cat;
    doGameSetup();
    console.log(`You have selected a ${animalSelect.species}`);

//     choosePetGrid.style.display = "none";
//     choosePetTitle.style.display = "none";
//     giveNameHeader.style.display = ""
//     nameInputter.style.display = ""
})

const bunnySelect = document.getElementById("select-bunny");
bunnySelect.addEventListener("click", () => {
    animalSelect = bunny;
    doGameSetup();
    console.log(`You have selected a ${animalSelect.species}`);
    
//     choosePetGrid.style.display = "none";
//     choosePetTitle.style.display = "none";
//     giveNameHeader.style.display = ""
//     nameInputter.style.display = ""
})

const crocSelect = document.getElementById("select-croc");
crocSelect.addEventListener("click", () => {
    animalSelect = croc;
    doGameSetup();
    console.log(`You have selected a ${animalSelect.species}`);
    
//     choosePetGrid.style.display = "none";
//     choosePetTitle.style.display = "none";
//     giveNameHeader.style.display = ""
//     nameInputter.style.display = ""
})
////////// animal selection from choosePet.html END ///////////

//console.log(`You have selected a ${animalSelect}`);

////////// naming of pet START ///////////
const input = document.getElementById("input");
const submit = document.getElementById("submit");


const petNamer = () => {
    petName = input.value;
    //console.log(petName);
}

submit.addEventListener("click", () => {
    petNamer();
    //console.log(`The pets name is ${petName}`);
    myPet.name = petName;
    myPet.type = animalSelect;
    myPet.pic = myPet.type.pics[0];
    document.getElementById("pet-image").src = myPet.pic;

    // = new Cyberpet(petName, animalSelect);
    //console.log(animalSelect);
    //console.log(myPet);    
    giveNameHeader.style.display = "none"
    nameInputter.style.display = "none"
    game.style.display = ""
    // need to add instruction to change header ton include pet name
});
////////// naming of pet END ///////////



////////// click event for feed/clean/play START/////////////////// 
const feedClick = document.getElementById("feedClick");
feedClick.addEventListener("mousedown", () => {
    myPet.feedPet();
    document.getElementById("pet-image").src = "pics/dog-pieces_q50.webp"
    //console.log("feed test");
});
feedClick.addEventListener("mouseup", () => {
    document.getElementById("pet-image").src = myPet.pic; //"pics/dog-happy_q50.webp"
    //console.log("feed test");
});

const cleanClick = document.getElementById("cleanClick");
cleanClick.addEventListener("mousedown", () => {
    myPet.cleanPet();
    document.getElementById("pet-image").src = "pics/dog-van-goch_q50.webp"
    //console.log("clean test");
});
cleanClick.addEventListener("mouseup", () => {
    document.getElementById("pet-image").src = myPet.pic; //"pics/dog-happy_q50.webp"
    //console.log("clean test");
});


const playClick = document.getElementById("playClick");
playClick.addEventListener("mousedown", () => {
    myPet.playWithPet();
    document.getElementById("pet-image").src = "pics/dog-unwell_q50.webp"
    //console.log("play test");
});
playClick.addEventListener("mouseup", () => {
    document.getElementById("pet-image").src = myPet.pic; //"pics/dog-happy_q50.webp"
    //console.log("play test");
});
////////// click event for feed/clean/play END///////////////////
