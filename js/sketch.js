//CAT ROULETTE
let initialresponse;
//Data Essentials
let catfacts = [];
let catpics = [];
let catpics_url = ['img/spacecat.jpg', 'img/orangecat.jpg', 'img/wildcat.jpg', 'img/yawningcat.jpg', 'img/laptopcat.gif', 'img/ceilingcat.jpg', 'img/fatcat.jpg', 'img/mow.jpg', 'img/jumpingcats.jpg', 'img/angrycat.jpg', 'img/shycat.jpg', 'img/exoticcat.jpg', 'img/derpcat.jpg', 'img/wonderingcat.jpg'];
//Randomized Arrays
let catsrandom = [], randompics = [];
//App Globals
let appstate = 0, maxcats = 7, loadlimit = 100, mytimeout;
//Elements
let catbutton, catmessage_opt, catreset_opt;
let catwin, catwin_content, catwin_content_dom, chat_input, chat_button, catwin_pic, catwin_close;
let mychats = [];
//Dimensions
let catdimensions = [[400, 400, 400, 400, 300, 460, 450, 400, 400, 400, 400, 400, 400, 400], 
[263, 266, 270, 266, 300, 262, 253, 278, 266, 317, 266, 273, 266, 287]];
//Fonts
let mregular, mmedium, msemi;

function preload() {
    // catpics[0] = loadImage(catpics_url[0]);
    // catpics[1] = loadImage(catpics_url[1]);
    // catpics[2] = loadImage(catpics_url[2]);
    // catpics[3] = loadImage(catpics_url[3]);
    // catpics[4] = loadImage(catpics_url[4]);

    console.log("Cat Pic URLs: " + catpics_url.length);
    console.log("Cat Widths: " + catdimensions[0].length);
    console.log("Cat Heights: " + catdimensions[1].length);

    for(i = 0; i < catpics_url.length; i++) {
        catpics[i] = loadImage(catpics_url[i]);
    }

    mregular = loadFont('fonts/Montserrat-Regular.ttf');
    //mmedium = loadFont('fonts/Montserrat-Medium.ttf');
    msemi = loadFont('fonts/Montserrat-SemiBold.ttf');
}

function setup() {
    //fill the whole screen
    createCanvas(windowWidth, windowHeight);

    catbutton = select("#proceed_opt");
    catbutton.mousePressed(requestcats);

    catmessage_opt = select("#catmessage_opt");
    catmessage_opt.mousePressed(chatcat);
    catreset_opt = select("#catreset_opt");
    catreset_opt.mousePressed(goagain);

    catwin = select("#catwin");
    catwin_content = select("#catwin_content");
    catwin_content_dom = document.getElementById("catwin_content");
    catwin_close = select("#catwin_close");
    catwin_close.mousePressed(closecat);

    chat_input = select("#chat_input");
    chat_button = select("#chat_button");
    chat_button.mousePressed(sendtocat);
    catwin_pic = document.getElementById("catwin_pic");
}

function draw() {
    background('#ff3d3d');
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
        textLeading(21);
        textAlign(CENTER);
        image(catpics[randompics[appstate - 1]], windowWidth / 2, windowHeight / 2, catdimensions[0][randompics[appstate - 1]], catdimensions[1][randompics[appstate - 1]]);
        text(catfacts[catsrandom[appstate - 1]], 70, windowHeight - 85, windowWidth - 140, windowHeight -30);
        pop();

        push();
        textFont(msemi);
        textSize(20);
        textLeading(26);
        textAlign(CENTER);
        text("BIO", 70, windowHeight - 115, windowWidth - 140, windowHeight - 30);
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
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            initialresponse = JSON.parse(this.responseText);
            // console.log(initialresponse.data);
            catfacts = [];
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

            appstate = 1;
            catbutton.class('hide_button');
            catmessage_opt.addClass('show_opt');
            catreset_opt.addClass('show_opt');
            loopcats();
            
        }
    };

    xhttp.open("GET", "https://catfact.ninja/facts?limit=" + loadlimit.toString(), true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function loopcats() {
    mytimeout = setTimeout(function(){

        //Also keeping for now
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
        catwin_pic.src = catpics_url[randompics[appstate - 1]];
    }
}

function closecat() {
    if(catwin.hasClass('showwin') == true) {
        catwin.removeClass('showwin');
    }
}

function sendtocat() {
    if(chat_input.value() !== "") {
        addchat("you", chat_input.value());
        chat_input.value('');
        setTimeout(function(){
            addchat("cat", catfacts[round(random(0, catfacts.length - 1))]);
        }, 1000);
    } else {
        alert("Chat can't be blank");
    }
}

function addchat(whoami, words) {
    mychats.push(createP(words));
    mychats[mychats.length - 1].addClass("generic_line");
    if(whoami == "you") {
        mychats[mychats.length - 1].addClass("you_line");
    } else if(whoami == "cat") {
        mychats[mychats.length - 1].addClass("cat_line");
    }

    catwin_content.child(mychats[mychats.length - 1]);
    catwin_content_dom.scrollTop = catwin_content_dom.scrollHeight;
}

function goagain() {
    clearTimeout(mytimeout);
    requestcats();
    closecat();

    mychats = [];
    catwin_content_dom.innerHTML = "";
}

function keyPressed() {
    if (keyCode === ENTER) {
        if(appstate > 0 && catwin.hasClass('showwin') == true) {
            sendtocat();
        }
    }
}