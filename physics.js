var w = new World('physics');

function populate() {
	w.stop();
	w.clear();
	w.shapes = [];
	
	if(sim.value == 'random') {
		w.scale = 40;
		w.width = w.canvas.width / w.scale;
		w.height = w.canvas.height / w.scale;
		for(var counter = 0; counter < 5; counter++) {
			var p = new Vector(w.width*(Math.random()-0.5), w.height*(Math.random()-0.5));
			var speed = 2;
			var v = new Vector(Math.random()-0.5, Math.random()-0.5).normal().times(speed);
			var s = new Shape(p, v, .1);
			w.add(s);
		}
	}
		
	if(sim.value == 'earth') {
		w.scale = 1e-5;
		w.width = w.canvas.width / w.scale;
		w.height = w.canvas.height / w.scale;
		var earth = new Shape(new Vector(0, 0), new Vector(0, 0), 5.9736e24);
		earth.radius = 6371e3;
		var moon = new Shape(new Vector(362570e3, 0), new Vector(0, 0), 7.3477e22);
		moon.radius = 1737e3;
		w.add(earth);
		w.add(moon);
	}
	
	w.draw();
	w.listen();
	w.start();
}

var sim = document.getElementById("simulation");
sim.addEventListener('change', populate, false);
populate();
