// TOUCH

var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var screen = document.querySelector("#myElement");
var el = document.querySelector("#hitarea");
var containerui = document.querySelector("#containerui");
var touchui = document.querySelector("#touchui");
var cursor = document.querySelector("#cursor");
var activate = document.querySelector("#activate");
var activateText = document.querySelector("#activateText");
var deactivate = document.querySelector("#deactivate");


  // Add children
  

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

var animationA = anime({
    targets: '#deactivate',
    scale: .5,
    loop: false,
    autoplay: false,
    background: "#FFFFFF",
});

var animationB = anime({
    targets: '#deactivate',
    scale: 1,
    loop: false,
    autoplay: false,
    background: "#FFDC00",
});

var animationC = anime({
    targets: '#activate',
    scale: 2,
    loop: false,
    autoplay: false,
    background: "#FFDC00",
});

var animationD = anime({
    targets: '#activate',
    scale: 1,
    loop: false,
    autoplay: false,
    background: "#FFFFFF",
});



mc.on("hammer.input", function(ev) {
    if(ev.isFinal) {
        // resetElement();
        animationB.play();
        animationD.play();
    }

    var tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750,
        loop: false,
      });
      

    if(ev.isFirst) {
        tl
        .add({
            targets: '#touchui',
            scale: 1.2,
        })
        .add({
            targets: '#touchui',
            scale: 1,
        });  
    }
    
});

function logEvent(ev) {
    //el.innerText = ev.type;
}

function resetElement() {
    touchui.className = 'animate';
    cursor.className = 'animate';
    containerui.className = 'animate';
    transform = {
        translate: { x: START_X, y: START_Y },
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };

    requestElementUpdate();
}

function updateElementTransform() {
    var value = [
        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
    ];

    var bgvalue = [
        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)'
    ]

    value = value.join(" ");
    bgvalue = bgvalue.join(" ");
    
    touchui.style.webkitTransform = value;
    touchui.style.mozTransform = value;
    touchui.style.transform = value;

    cursor.style.webkitTransform = value;
    cursor.style.mozTransform = value;
    cursor.style.transform = value;

    containerui.style.webkitTransform = bgvalue;
    containerui.style.mozTransform = bgvalue;
    containerui.style.transform = bgvalue;

    ticking = false;
}

function requestElementUpdate() {
    if(!ticking) {
        reqAnimationFrame(updateElementTransform);
        ticking = true;
    }
}



var initAngle = 0;
var xAngle = 0
var yAngle = 0;
var deltaAngle = 0;

function onRotate(ev) {
    if(ev.type == 'rotatestart') {
        initAngle = 0;
        xAngle = ev.rotation;
    }
    transform.translate = {
        x: ev.center.x - 200,
        y: ev.center.y - 200
    };
    el.className = '';
    transform.rz = 1;
    transform.angle = initAngle + ev.rotation;
    yAngle = ev.rotation;

    el.innerHTML = xAngle + " " + yAngle

    deltaAngle = Math.abs(xAngle - yAngle);
    
    
    if (deltaAngle > 30) {
        animationB.play();
        animationA.pause();
        animationD.play();
        animationC.pause();
    } else {
        animationB.pause();
        animationA.play();
        animationD.pause();
        animationC.play();
    }

    logEvent(ev);
    requestElementUpdate();
}

function onPan(ev) {
    el.className = '';
    transform.translate = {
        x: ev.center.x - 200,
        y: ev.center.y - 200
    };
    // containerui.innerText = ev.center.x + " " + ev.center.y

    logEvent(ev);
    requestElementUpdate();
}

resetElement();

