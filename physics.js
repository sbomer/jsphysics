var w = new World('physics');

function populate() {
	w.stop();
	w.shapes = [];
	
	if(sim.value == 'random') {
		w.scale = 40;
		for(var counter = 0; counter < 5; counter++) {
			var p = new Vector(w.width*(Math.random()-0.5), w.height*(Math.random()-0.5));
			var speed = 2;
			var v = new Vector(Math.random()-0.5, Math.random()-0.5).normal().times(speed);
			var s = new Shape(p, v, .1);
			w.add(s);
		}
		
	}
	
	w.listen();
	w.update();
	w.start();
}

var sim = document.getElementById("simulation");
sim.addEventListener('change', populate, false);
populate();
