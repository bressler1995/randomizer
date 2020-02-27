//travel to the stars on a wacky adventure with elon musk
let random_cat_facts;

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
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            random_cat_facts = this.responseText;
            console.log(random_cat_facts);
        }
    };

    if("withCredentials" in xhttp) {
        xhttp.open("GET", "//cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2", true);
        xhttp.send();
    }

}