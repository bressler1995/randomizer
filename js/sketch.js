//CAT ROULETTE
let initialresponse;
let catfacts = [];
let catpics = [];
let catpics_url = ['img/spacecat.jpg'];
let catsset = false;
let appstate = 0;

function preload() {
    catpics[0] = loadImage(catpics_url[0]);
    catpics[1] = loadImage(catpics_url[0]);
}

function setup() {
    //lets make it responsive
    createCanvas(windowWidth, windowHeight);
    requestcats();
    button = createButton('Start Chatting With Cats');
    button.id('proceed_opt');
    button.mousePressed(start_catting);
}

function draw() {
    background('#380572');
    if(catsset) {
        if (appstate == 0) {
            imageMode(CENTER);
            image(catpics[0], windowWidth / 2, windowHeight / 2, 400, 263);
        }
    }
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function requestcats() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            initialresponse = JSON.parse(this.responseText);
            // console.log(initialresponse.data);
            for (i = 0; i < initialresponse.data.length; i++) {
                catfacts.push(initialresponse.data[i].fact);
                console.log(initialresponse.data[i].fact);
            }

            catsset = true;
        }
    };

    xhttp.open("GET", "https://catfact.ninja/facts?limit=8", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function start_catting() {

}