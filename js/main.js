
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
var uipositionX = 0
var uipositionY = 0

mc.on("pinch rotate", function(event) {
    // myElement.textContent = event.center.x;
    angle = event.angle * Math.PI / 180;
    uipositionX = event.center.x
    uipositionX = event.center.y
});

function setup() {
    createCanvas(640, 480);
}


function draw() {
    translate(width / 2, height / 2);
    rotate(angle);
    rect(uipositionX, uipositionY, 100, 100);
}

