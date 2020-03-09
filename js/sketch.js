//CAT ROULETTE
let initialresponse;
let catfacts = [];
let catpics = [];
let catpics_url = ['img/spacecat.jpg', 'img/orangecat.jpg', 'img/wildcat.jpg', 'img/yawningcat.jpg', 'img/laptopcat.gif', 'img/ceilingcat.jpg', 'img/fatcat.jpg', 'img/mow.jpg', 'img/jumpingcats.jpg', 'img/angrycat.jpg', 'img/shycat.jpg', 'img/exoticcat.jpg', 'img/derpcat.jpg', 'img/wonderingcat.jpg'];
let catsrandom = [], randompics = [];
let catsset = false;
let appstate = 0, maxcats = 7;
let catbutton, cattitle, catmessage_opt, catwin;
let catwidth = [400, 400, 400, 400, 300, 460, 450, 400, 400, 400, 400, 400, 400, 400], catheight = [263, 266, 270, 266, 300, 262, 253, 278, 266, 317, 266, 273, 266, 287];
let mregular, mmedium, msemi;

function preload() {
    // catpics[0] = loadImage(catpics_url[0]);
    // catpics[1] = loadImage(catpics_url[1]);
    // catpics[2] = loadImage(catpics_url[2]);
    // catpics[3] = loadImage(catpics_url[3]);
    // catpics[4] = loadImage(catpics_url[4]);

    console.log("Cat Pic URLs: " + catpics_url.length);
    console.log("Cat Widths: " + catwidth.length);
    console.log("Cat Heights: " + catheight.length);

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
    fill(255);
    imageMode(CENTER);

    if(appstate == 0) {
        push();
       

        image(catpics[0], windowWidth / 2, windowHeight / 2, 400, 263);
        pop();
    } else if(appstate > 0) {
        push();
        textFont(mregular);
        textSize(15);
        textLeading(19);
        textAlign(CENTER);
        image(catpics[randompics[appstate - 1]], windowWidth / 2, windowHeight / 2, catwidth[randompics[appstate - 1]], catheight[randompics[appstate - 1]]);
        text(catfacts[catsrandom[appstate - 1]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
        pop();

        push();
        textFont(msemi);
        textSize(18);
        textLeading(24);
        textAlign(CENTER);
        text("BIO", 50, windowHeight - 100, windowWidth - 100, windowHeight - 80);
        pop();
        
        
    }

   
    //Keeping For Now
    // if (appstate == 0) {
    //     image(catpics[0], windowWidth / 2, windowHeight / 2, 400, 263);
    // } else if(appstate == 1) {
    //     image(catpics[randompics[0]], windowWidth / 2, windowHeight / 2, 400, 266);
    //     text(catfacts[catsrandom[0]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    // } else if(appstate == 2) {
    //     image(catpics[randompics[1]], windowWidth / 2, windowHeight / 2, 400, 271);
    //     text(catfacts[catsrandom[1]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    // } else if(appstate == 3) {
    //     image(catpics[randompics[2]], windowWidth / 2, windowHeight / 2, 400, 266);
    //     text(catfacts[catsrandom[2]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    // } else if(appstate == 4) {
    //     image(catpics[randompics[3]], windowWidth / 2, windowHeight / 2, 400, 266);
    //     text(catfacts[catsrandom[3]], 50, windowHeight - 75, windowWidth - 100, windowHeight -30);
    // }

    
    
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

            for (i = 0; i < maxcats; i++) {
                catsrandom[i] = round(random(0, catfacts.length - 1));
                randompics[i] = round(random(0, catpics.length - 1));

                console.log("Fact " + (i + 1) + ":" + catsrandom[i]);
                console.log("Pic " + (i + 1) + ":" + randompics[i]);

            }

            catsset = true;
            appstate = 1;
            catbutton.class('hide_button');
            catmessage_opt.addClass('show_opt');
            loopcats();
            
        }
    };

    xhttp.open("GET", "https://catfact.ninja/facts?limit=50", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function loopcats() {
    setTimeout(function(){

        // if(appstate == 1) {
        //     appstate++;
        //     loopcats();
        // } else if(appstate == 2) {
        //     appstate++;
        //     loopcats();
        // } else if(appstate == 3) {
        //     appstate++;
        // }

        if (appstate > 0 && maxcats > 1) {
            if(appstate < maxcats) {
                appstate++;
                if(appstate < maxcats - 1) {
                    loopcats();
                }
            } 
        }
    }, 100);
}

function chatcat() {
    if(catwin.hasClass('showwin') == false) {
        catwin.addClass('showwin');
    }
}