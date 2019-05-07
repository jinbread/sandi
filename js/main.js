
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

    logEvent(ev);
    requestElementUpdate();
}

function onPan(ev) {
    el.className = '';
    transform.translate = {
        x: ev.center.x - 100,
        y: ev.center.y - 100
    };

    logEvent(ev);
    requestElementUpdate();
}

resetElement();
