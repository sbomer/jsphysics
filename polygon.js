function Polygon() {
    this.points = Array.prototype.slice.call(arguments);
}
Polygon.prototype = {
    center: function() {
        var center = this.points[0];
        for (var i = 1; i < this.points.length; i++) {
            center = center.plus(this.points[i]);
        }
        return center.times(1 / this.points.length);
    },
    normals: function() {
        var normals = [];
        for (var i = 0; i < this.points.length - 1; i++) {
            var edge = this.points[i + 1].minus(this.points[i]);
            var normal = edge.normal().norm();
            normals.push(normal);
        }
        return normals;
    },
    project: function(axis) {
        var points = [];
        for (var i = 0; i < this.points.length; i++) {
            points.push(this.points[i].dot(axis));
        }
        var min = Math.min.apply(Math, points);
        var max = Math.max.apply(Math, points);
        return {
            min: min,
            max: max,
        };
    },
    intersects: function(p) {
        var axes = this.normals().concat(p.normals());
        for (var i = 0; i < axes.length; i++) {
            var self = this.project(axes[i]);
            var other = p.project(axes[i]);
            var intersect = self.min < other.max && self.max > other.min;
            if (!intersect) {
                return false;
            }
        }
        return true;
    },
    draw: function(display) {
        display.drawPolygon(this.points);
    },
    translate: function(position) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i] = this.points[i] + position;
        }
    },
    rotate: function(angle) {
        var c = this.center();
        for (var i = 0; i < this.points.length; i++) {
            this.points[i] - c;
        }
    },
};
