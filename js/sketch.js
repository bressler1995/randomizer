//travel to the stars on a wacky adventure with elon musk
let initialresponse;
let catfacts = [];
let catsset = false;

function setup() {
    //lets make it responsive
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    if(catsset == true) {
        fill(255);
        textFont('Arial');
        textSize(14);

        for(i = 0; i < catfacts.length; i++) {
            text(catfacts[i], 0, 20 * i, windowWidth, (20 * i) + 14);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    requestcats();
}

function requestcats() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            initialresponse = JSON.parse(this.responseText);
            // console.log(initialresponse.data);
            for (i = 0; i < initialresponse.data.length; i++) {
                catfacts.push(initialresponse.data[i].fact);
            }

            catsset = true;
        }
    };

        xhttp.open("GET", "https://catfact.ninja/facts?limit=8", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

}