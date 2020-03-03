//travel to the stars on a wacky adventure with elon musk
let initialresponse;
let catfacts = [];
let catpics = [];
let catsset = false;
let appstate = 0;

function preload() {
    catpics[0] = loadImage('img/spacecat.jpg')
}

function setup() {
    //lets make it responsive
    createCanvas(windowWidth, windowHeight);
    requestcats();
}

function draw() {
    background('#380572');
    if(catsset) {
        if (appstate == 0) {
            imageMode(CENTER);
            image(catpics[0], 0, 0);
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