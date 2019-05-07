var myElement = document.getElementById('myElement');

var mc = new Hammer.Manager(myElement);

// create a pinch and rotate recognizer
// these require 2 pointers
var pinch = new Hammer.Pinch();
var rotate = new Hammer.Rotate();

// we want to detect both the same time
pinch.recognizeWith(rotate);

// add to the Manager
mc.add([pinch, rotate]);

var angle = 0
var uiposition = 0

mc.on("pinch rotate", function(event) {
    myElement.textContent = event.center;
    angle = event.angle;
    console.log(event.center);
});

function setup() {
    createCanvas(640, 480);
}

function draw() {
    translate(width / 2, height / 2);
    rotate(angle);
    rect(30, 20, 55, 55);
}