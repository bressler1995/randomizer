//CAT ROULETTE
let initialresponse;
let catfacts = [];
let catpics = [];
let catpics_url = ['img/spacecat.jpg', 'img/orangecat.jpg', 'img/wildcat.jpg', 'img/yawningcat.jpg', 'img/laptopcat.gif', 'img/ceilingcat.jpg'];
let catsrandom = [];
let catsset = false;
let appstate = 0;
let catbutton, catfont;

function preload() {
    // catpics[0] = loadImage(catpics_url[0]);
    // catpics[1] = loadImage(catpics_url[1]);
    // catpics[2] = loadImage(catpics_url[2]);
    // catpics[3] = loadImage(catpics_url[3]);
    // catpics[4] = loadImage(catpics_url[4]);

    for(i = 0; i < catpics_url.length; i++) {
        catpics[i] = loadImage(catpics_url[i]);
    }

    catfont = loadFont('fonts/Montserrat-Regular.ttf');
}

function setup() {
    //lets make it responsive
    createCanvas(windowWidth, windowHeight);
    requestcats();
    catbutton = createButton('Start Chatting With Cats');
    catbutton.id('proceed_opt');
    catbutton.mousePressed(start_catting);
}

function draw() {
    background('#380572');
    if(catsset) {
        textFont(catfont);
        textSize(15);
        textLeading(19)
        imageMode(CENTER);

        if (appstate == 0) {
            push();
            image(catpics[0], windowWidth / 2, windowHeight / 2, 400, 263);
            pop();
        } else if(appstate == 1) {
            push();
            image(catpics[1], windowWidth / 2, windowHeight / 2, 400, 266);
            fill(255);
            text(catfacts[catsrandom[0]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
            pop();
        } else if(appstate == 2) {
            push();
            image(catpics[2], windowWidth / 2, windowHeight / 2, 400, 271);
            fill(255);
            text(catfacts[catsrandom[1]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
            pop();
        } else if(appstate == 3) {
            push();
            image(catpics[3], windowWidth / 2, windowHeight / 2, 400, 266);
            fill(255);
            text(catfacts[catsrandom[2]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
            pop();
        } else if(appstate == 4) {
            push();
            image(catpics[4], windowWidth / 2, windowHeight / 2, 400, 266);
            fill(255);
            text(catfacts[catsrandom[3]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
            pop();
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
                // console.log(initialresponse.data[i].fact);
            }

            for (i = 0; i < 4; i++) {
                catsrandom[i] = round(random(0, catfacts.length - 1));
                console.log("Number " + (i + 1) + ":" + catsrandom[i]);
            }

            catsset = true;

            
        }
    };

    xhttp.open("GET", "https://catfact.ninja/facts?limit=12", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function start_catting() {
    appstate = 1;
    catbutton.class('hide_button');
    loopcats();
}

function loopcats() {
    setTimeout(function(){

        if(appstate == 1) {
            appstate++;
            loopcats();
        } else if(appstate == 2) {
            appstate++;
            loopcats();
        } else if(appstate == 3) {
            appstate++;
        }
    }, 500);
}