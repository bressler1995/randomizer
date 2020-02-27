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
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            random_cat_facts = this.responseText;
            console.log(random_cat_facts);
        }
    };

        xhttp.open("GET", "https://catfact.ninja/facts/random?animal_type=cat&amount=2", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

}