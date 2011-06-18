var w = new World('physics');
for(var counter = 0; counter < 5; counter++) {
	var p = new Vector(w.width*(Math.random()-0.5), w.height*(Math.random()-0.5));
	var speed = 2;
	var v = new Vector(Math.random()-0.5, Math.random()-0.5).normal().times(speed);
	var s = new Shape(p, v);
	w.add(s);
}
w.draw();
w.listen();
w.start();
