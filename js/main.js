
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
    myElement.textContent = event.center.x;
    angle = event.angle;
    uipositionX = event.center.x
    uipositionX = event.center.y
});

// function setup() {
//     createCanvas(640, 480);
// }


// function draw() {
//     translate(width / 2, height / 2);
//     rotate(angle);
//     rect(uipositionX, uipositionY, 55, 55);
// }

// Make an instance of two and place it on the page.
var elem = document.getElementById('myElement');
var params = { width: 285, height: 200 };
var two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;
circle.rotation = angle;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();
rect.rotation = angle;

// Don't forget to tell two to render everything
// to the screen
two.update();