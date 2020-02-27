//travel to the stars on a wacky adventure with elon musk
let initialresponse;
let catfacts = [];

function setup() {
    //lets make it responsive
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
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
            console.log(catfacts);
        }
    };

        xhttp.open("GET", "https://catfact.ninja/facts?limit=8", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

}