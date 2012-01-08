function Body(state, mass) {
    this.state = state;
    this.mass = mass || 1;
    this.radius = Math.pow(this.mass*3/4/Math.PI, 1/3); //radius of 1kg/m^3 sphere
    this.j = Vector.zero(2);
    var x = this.state.position.get(0);
    var y = this.state.position.get(1);
    this.shape = new Polygon(new Vector(x-0.5,y-0.5),new Vector(x-0.5,y+0.5),new Vector(x+0.5,y-0.5));
}
Body.prototype = {
    getState: function() {
        return this.position.join(this.velocity).join(this.angle).join(this.angularVelocity);
    },
    setState: function(s) {
        var i = 0;
        this.position = s.cut(i, this.position.size());
        i += this.position.size();
        this.velocity = s.cut(i, this.velocity.size());
        i += this.velocity.size();
        this.angle = s.cut(i, this.angle.size());
        this.angle.set(0, this.angle.get(0) % (2*Math.PI));
        i += this.angle.size();
        this.angularVelocity = s.cut(i, this.angularVelocity.size());
    },
    move: function(state) {
        var i = 0;
        this.position = this.position.plus();
    },
    distance: function(s) {
        return s.position.minus(this.position);
    },
    acceleration: function() {
        return this.force.times(1/this.mass);
    },
    torque: function() {
        return new Vector(0);
    },
    derivative: function() {
        return this.velocity.join(this.acceleration()).join(this.angularVelocity).join(this.torque());
    },
    intersects: function(s) {
        var d = s.position.minus(this.position);
        var r = this.radius + s.radius;
        return d.dot(d) < r*r;
    },
    impulse: function(s) {
        var r = this.distance(s);
        var v = s.velocity.minus(this.velocity).project(r);
        return v.times((World.e+1)/(1/this.mass+1/s.mass));
    },
    draw: function(display) {
        //display.drawSquare(this.position, this.angle, this.radius);
        this.shape.draw(display);
    }
};
