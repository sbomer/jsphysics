function World(id, scale, speed) {
    this.dimensions = 2;
    this.framerate = 30; //frames per second
    this.speed = speed || 1; //larger moves faster
    this.dt = this.speed / this.framerate; //seconds per frame
    this.shapes = [];
    this.canvas = document.getElementById(id);
    this.display = new Display(id, scale);
}
World.prototype = {
    add: function(shape) {
        this.shapes.push(shape);
    },
    each: function(f) {
        for(var i = 0, j = this.size(); i < j; i++) {
            f(this.get(i));
        }
    },
    pair: function(f) {
        for(var i = 0, n = this.size(); i < n; i++) {
            var b = this.get(i);
            for(var j = i + 1; j < n; j++) {
                var o = this.get(j);
                f(b, o);
            }
        }
    },
    gravity: function() {
        this.pair(function(b, o) {
            f = b.gravity(o);
            b.force = b.force.plus(f);
            o.force = o.force.minus(f);
        });
    },
    impulse: function() {
        this.pair(function(b, o) {
            if (b.intersects(o)) {
                var j = b.impulse(o);
                b.j = b.j.plus(j);
                o.j = o.j.minus(j);
            }
        });
    },
    force: function() {
        var that = this;
        this.each(function(s) { s.force = Vector.zero(that.dimensions); });
        this.gravity();
    },
    move: function(h) {
        this.force();
        this.each(function(s) { s.old = s.getState(); });
        this.each(function(s) { s.k1 = s.derivative().times(h); });
        this.each(function(s) { s.setState(s.old.plus(s.k1.times(1/2))); });
        this.force();
        this.each(function(s) { s.k2 = s.derivative().times(h); });
        this.each(function(s) { s.setState(s.old.plus(s.k2.times(1/2))); });
        this.force();
        this.each(function(s) { s.k3 = s.derivative().times(h); });
        this.each(function(s) { s.setState(s.old.plus(s.k3)); });
        this.force();
        this.each(function(s) { s.k4 = s.derivative().times(h); });
        this.each(function(s) { s.setState(s.old.plus(s.k1.plus(s.k2.plus(s.k3).times(2)).plus(s.k4).times(1/6))); });
    },
    collide: function() {
        var that = this;
        this.each(function(s) { s.j = Vector.zero(that.dimensions); });
        this.impulse();
        this.each(function(s) { s.velocity = s.velocity.plus(s.j.times(1/s.mass)); });
    },
    bound: function() {
        var w = this;
        this.each(function(s) {
            var p = s.position;
            var v = s.velocity;
            var r = s.radius;
            if(p.get(0)-r < -w.width/2 || p.get(0)+r > w.width/2) {
                if(p.get(0)-r < -w.width/2) {
                    p.set(0, -w.width/2+r);
                } else {
                    p.set(0, w.width/2-r);
                }
                v.set(0, -World.e*v.get(0));
            }
            if(p.get(1)-r < -w.height/2 || p.get(1)+r > w.height/2) {
                if(p.get(1)-r < -w.height/2) {
                    p.set(1, -w.height/2+r);
                } else {
                    p.set(1, w.height/2-r);
                }
                v.set(1, -World.e*v.get(1));
            }
        });
    },
    draw: function() {
        var d = this.display;
        this.each(function(s) { s.draw(d) });
    },
    clear: function() {
        this.display.clear();
    },
    update: function() {
        this.move(this.dt);
        this.collide();
        this.bound();
        this.clear();
        this.draw();
    },
    listen: function() {
        var that = this;
        var f = function(position) {
            that.add(new Body(position));
        };
        this.display.setClick(f);
    },
    start: function() {
        var w = this;
        var f = function() { w.update(); };
        this.interval = window.setInterval(f, 1000 / this.framerate); //ms per frame
    },
    stop: function() {
        clearInterval(this.interval);
    },
    get: function(i) {
        return this.shapes[i];
    },
    size: function() {
        return this.shapes.length;
    },
    resize: function() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.width = this.canvas.width / this.scale;
        this.height = this.canvas.height / this.scale;
    },
}
World.G = 6.673e-11;
World.e = 1;
