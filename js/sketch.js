//CAT ROULETTE
let initialresponse;
let catfacts = [];
let catpics = [];
let catpics_url = ['img/spacecat.jpg', 'img/orangecat.jpg', 'img/wildcat.jpg', 'img/yawningcat.jpg', 'img/laptopcat.gif', 'img/ceilingcat.jpg'];
let catsrandom = [];
let catsset = false;
let appstate = 0;
let catbutton, cattitle, catmessage_opt, catwin;
let mregular, mmedium, msemi;

function preload() {
    // catpics[0] = loadImage(catpics_url[0]);
    // catpics[1] = loadImage(catpics_url[1]);
    // catpics[2] = loadImage(catpics_url[2]);
    // catpics[3] = loadImage(catpics_url[3]);
    // catpics[4] = loadImage(catpics_url[4]);

    for(i = 0; i < catpics_url.length; i++) {
        catpics[i] = loadImage(catpics_url[i]);
    }

    mregular = loadFont('fonts/Montserrat-Regular.ttf');
    //mmedium = loadFont('fonts/Montserrat-Medium.ttf');
    msemi = loadFont('fonts/Montserrat-SemiBold.ttf');
}

function setup() {
    //lets make it responsive
    createCanvas(windowWidth, windowHeight);
    // requestcats();
    catbutton = createButton('Start Chatting With Cats');
    catbutton.id('proceed_opt');
    catbutton.mousePressed(requestcats);

    cattitle = createP("CatRoulette&trade;")
    cattitle.class('cat_title');

    catmessage_opt = createButton('<i class="fas fa-comment-dots"></i>');
    catmessage_opt.class('catmessage_opt');
    catmessage_opt.mousePressed(chatcat);

    catwin = createDiv('');
    catwin.class('catwin');
}

function draw() {
    background('#380572');
    push();
    fill(255);

    if(appstate > 0) {
        textFont(msemi);
        textSize(18);
        textLeading(24);
        textAlign(CENTER);
        text("BIO", 50, windowHeight - 100, windowWidth - 100, windowHeight - 80);
    }

    pop();
        
    push();
    fill(255);
    textFont(mregular);
    textSize(15);
    textLeading(19);
    textAlign(CENTER);
    imageMode(CENTER);

    if (appstate == 0) {
        image(catpics[0], windowWidth / 2, windowHeight / 2, 400, 263);
    } else if(appstate == 1) {
        image(catpics[1], windowWidth / 2, windowHeight / 2, 400, 266);
        text(catfacts[catsrandom[0]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    } else if(appstate == 2) {
        image(catpics[2], windowWidth / 2, windowHeight / 2, 400, 271);
        text(catfacts[catsrandom[1]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    } else if(appstate == 3) {
        image(catpics[3], windowWidth / 2, windowHeight / 2, 400, 266);
        text(catfacts[catsrandom[2]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    } else if(appstate == 4) {
        image(catpics[4], windowWidth / 2, windowHeight / 2, 400, 266);
        text(catfacts[catsrandom[3]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    }

    pop();
    
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
            appstate = 1;
            catbutton.class('hide_button');
            catmessage_opt.addClass('show_opt');
            loopcats();
            
        }
    };

    xhttp.open("GET", "https://catfact.ninja/facts?limit=12", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

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
    }, 300);
}

function chatcat() {
    if(catwin.hasClass('showwin') == false) {
        catwin.addClass('showwin');
    }
}