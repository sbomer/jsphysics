var tag = 'physics'
var w = new World(tag);

function populate() {
	w.stop();
	w.clear();
	
	if(sim.value == 'random') {
		w = new World(tag);
		w.G = 0;
		for(var counter = 0; counter < 5; counter++) {
			var p = new Vector(w.width*(Math.random()-0.5), w.height*(Math.random()-0.5));
			var speed = 2;
			var v = new Vector(Math.random()-0.5, Math.random()-0.5).normal().times(speed);
			var s = new Shape(p, v, .1);
			w.add(s);
		}
	}
		
	if(sim.value == 'earth') {
		w = new World(tag, 0.5e-6, 60*60*24);
		var earth = new Shape(new Vector(0, 0), new Vector(0, 0), 5.9736e24);
		earth.radius = 6371e3;
		var moon = new Shape(new Vector(384399e3, 0), new Vector(0, 1022), 7.3477e22);
		moon.radius = 1737e3;
		w.add(earth);
		w.add(moon);
	}
	
	w.listen();
	w.start();
}

var sim = document.getElementById("simulation");
sim.addEventListener('change', populate, false);
populate();
