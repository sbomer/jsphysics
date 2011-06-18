var w = new World('physics');
for(var i = 0; i < 5; i++) {
	var p = new Vector(w.width*(Math.random()-0.5), w.height*(Math.random()-0.5));
	var direction = Math.random()*2*Math.PI;
	var speed = 1;
	var v = new Vector(speed*Math.cos(direction), speed*Math.sin(direction));
	var s = new Shape(p, v);
	w.add(s);
}
w.start()
