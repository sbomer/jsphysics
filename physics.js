var tag = 'physics'
var w = new World(tag);

function populate() {
    w.stop();
    w.clear();

    if(sim.value == 'random') {
        w = new World(tag);
        for(var counter = 0; counter < 5; counter++) {
            var p = Vector.random(w.dimensions).times(8 * Math.random());
            var speed = 2;
            var v = Vector.random(w.dimensions).times(speed);
            var s = new Body(new State(p, v));
            w.add(s);
        }
    }

    if(sim.value == 'circle') {
        w = new World(tag);
        var n = 7;
        var r = 5;
        var m = 1e12;
        for(var i = 0; i < n; i++) {
            var theta = i*2*Math.PI/n;
            var x = r*Math.cos(theta);
            var y = r*Math.sin(theta);
            var s = new Body(new State(new Vector(x, y), new Vector(0, 0)), m);
            s.radius = 0.5;
            w.add(s);
        }
        w.force();
        var v = Math.sqrt(r*w.get(0).acceleration().length());
        for(var i = 0; i < n; i++) {
            var theta = i*2*Math.PI/n;
            w.get(i).velocity = new Vector(-v*Math.sin(theta), v*Math.cos(theta));
        }

    }

    if(sim.value == 'orbit') {
        w = new World(tag);
        var r = 5;
        var center = new Body(new State(new Vector(0, 0), new Vector(0, 0)), 1e12);
        w.add(center);
        center.radius = 2;
        var outside = new Body(new State(new Vector(r, 0), new Vector(0, 0)), 1);
        w.add(outside);
        outside.radius = 0.5;
        w.force();
        var v = Math.sqrt(r*outside.acceleration().length());
        outside.velocity = new Vector(0, v);
    }

    w.listen();
    w.start();
}

var sim = document.getElementById("simulation");
sim.addEventListener('change', populate, false);
populate();
