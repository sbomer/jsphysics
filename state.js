function State(position, velocity, angle, aVelocity) {
    this.position = position;
    this.velocity = velocity;
    this.angle = angle || new Vector(0);
    this.aVelocity = aVelocity || new Vector(1);
}
State.prototype = {
    plus: function(s) {
        var newPosition = this.position.plus(s.position);
        var newVelocity = this.velocity.plus(s.velocity);
        var newAngle = this.angle.plus(s.angle);
        var newAVelocity = this.aVelocity.plus(s.aVelocity);
        return new State(newPosition, newVelocity, newAngle, newAVelocity);
    },
    times: function(c) {
        var newPosition = this.position.times(c);
        var newVelocity = this.velocity.times(c);
        var newAngle = this.angle.times(c);
        var newAVelocity = this.aVelocity.times(c);
        return new State(newPosition, newVelocity, newAngle, newAVelocity);
    },
    minus: function(s) {
        return this.plus(s.times(-1));
    }
};
