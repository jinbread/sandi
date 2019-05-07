
var myElement = document.querySelector("#hitarea");

var mc = new Hammer.Manager(myElement);

mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
mc.on("rotatestart rotatemove", onRotate);

var initAngle = 0;
function onRotate(ev) {
    if(ev.type == 'rotatestart') {
        initAngle = transform.angle || 0;
    }

    myElement.className = '';
    transform.rz = 1;
    transform.angle = initAngle + ev.rotation;

    logEvent(ev);
    requestElementUpdate();
}