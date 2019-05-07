
var elem = document.getElementById('touchui');
var params = {width: 400, height: 400};
var two = new Two(params).appendTo(elem);

var circle = two.makeCircle(200, 200, 100);
circle.fill = "#efc368"
circle.noStroke();
circle.opacity = 0;

var circle2 = two.makeCircle(200, 60, 10);
circle2.fill = "#efc368"
circle2.noStroke();
circle2.opacity = 0;

var circle3 = two.makeCircle(340, 200, 10);
circle3.fill = "#efc368"
circle3.noStroke();
circle3.opacity = 0;

var circle4 = two.makeCircle(292, 108, 10);
circle4.fill = "#efc368"
circle4.noStroke();
circle4.opacity = 0;



var line = two.makeLine(0, 200, 400, 200);
line.stroke = "#000000";
line.opacity = 0;
// line.linewidth = 5;


var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var screen = document.querySelector("#myElement");
var el = document.querySelector("#hitarea");
var touchui = document.querySelector("#touchui ");

var START_X = Math.round((screen.offsetWidth - touchui.offsetWidth) / 2);
var START_Y = Math.round((screen.offsetHeight - touchui.offsetHeight) / 2);

var ticking = false;
var transform;
var timer;

var mc = new Hammer.Manager(el);

mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
mc.on("panstart panmove", onPan);
mc.on("rotatestart rotatemove", onRotate);


mc.on("hammer.input", function(ev) {
    if(ev.isFinal) {
        // resetElement();
        circle.opacity = 0;
        circle2.opacity = 0;
        circle3.opacity = 0;
        circle4.opacity = 0;
        line.opacity = 0;
        two.update();
    }
    
});

function logEvent(ev) {
    //el.innerText = ev.type;
}

function resetElement() {
    touchui.className = 'animate';
    transform = {
        translate: { x: START_X, y: START_Y },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };
    requestElementUpdate();
}

function updateElementTransform() {
    var value = [
        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
        'scale(' + transform.scale + ', ' + transform.scale + ')',
        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
    ];

    value = value.join(" ");
    touchui.style.webkitTransform = value;
    touchui.style.mozTransform = value;
    touchui.style.transform = value;
    ticking = false;

    two.update();
}

function requestElementUpdate() {
    if(!ticking) {
        reqAnimationFrame(updateElementTransform);
        ticking = true;
    }
}

// var initAngle = 0;
function onRotate(ev) {
    if(ev.type == 'rotatestart') {
        initAngle = transform.angle || 0;
    }

    el.className = '';
    transform.rz = 1;
    transform.angle = ev.rotation;
    transform.translate = {
        x: ev.center.x - 200,
        y: ev.center.y - 200
    };
    // el.textContent = ev.rotation;
    circle.opacity = 1
    circle2.opacity = 1
    circle3.opacity = 1
    circle4.opacity = 1
    logEvent(ev);
    requestElementUpdate();
}

function onPan(ev) {
    el.className = '';
    transform.translate = {
        x: ev.center.x - 200,
        y: ev.center.y - 200
    };
    circle.opacity = 1
    circle2.opacity = 1
    circle3.opacity = 1
    circle4.opacity = 1

    logEvent(ev);
    requestElementUpdate();
}

resetElement();
