function Display(id, scale) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.scale = scale || 40; //pixels per meter, larger zooms in
    this.resize();
    this.listen();
}
Display.prototype = {
    clear: function() {
        var w = this.canvas.width / this.scale;
        var h = this.canvas.height / this.scale;
        this.context.clearRect(-w / 2, -h / 2, w, h);
    },
    resize: function() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.scale(this.scale, -this.scale);
    },
    listen: function() {
        var that = this;
        var f = function() {
            that.resize();
        };
        window.addEventListener('resize', f, false);
    },
    toPoint: function(v) {
        var x = v.get(0) - this.canvas.width / 2;
        var y = this.canvas.height / 2 - v.get(1);
        return new Vector(x, y).times(1 / this.scale);
    },
    drawCircle: function(position, angle, radius) {
        var c = this.context;
        var x = position.get(0);
        var y = position.get(1);
        var r = radius;
        var a = angle.get(0);
        c.save();
        c.translate(x, y);
        c.rotate(a);
        c.beginPath();
        c.arc(0, 0, r, 2 * Math.PI, false);
        c.closePath();
        c.fill();
        c.beginPath();
        c.arc(0, 0, r, Math.PI, false);
        c.closePath();
        c.fillStyle = new Color(255, 255, 255, 0.5).toString();
        c.fill();
        c.restore();
    },
    drawSquare: function(position, angle, radius) {
        var c = this.context;
        var x = position.get(0);
        var y = position.get(1);
        var r = radius;
        var a = angle.get(0);
        c.save();
        c.translate(x, y);
        c.rotate(a);
        c.beginPath();
        c.rect(-r, -r, 2 * r, 2 * r);
        c.closePath();
        c.fill();
        c.restore();
    },
    drawPolygon: function(points) {
        var c = this.context;
        c.beginPath();
        var begin = points[0];
        c.moveTo(begin.get(0), begin.get(1));
        for (var i = 1; i < points.length; i++) {
            var point = points[i];
            c.lineTo(point.get(0), point.get(1));
        }
        c.closePath();
        c.fillStyle = 'rgb(0, 0, 0)';
        c.fill();
    },
    getClick: function(event) {
        var x = event.pageX - this.offset().x;
        var y = event.pageY - this.offset().y;
        return this.toPoint(new Vector(x, y));
    },
    setClick: function(f) {
        var that = this;
        var g = function(event) {
            var position = that.getClick(event);
            f(position);
        };
        this.canvas.addEventListener('click', g, false);
    },
    offset: function() {
        var c = this.canvas;
        var offsetX = c.clientLeft;
        var offsetY = c.clientTop;
        do {
            offsetX += c.offsetLeft;
            offsetY += c.offsetTop;
        } while (c = c.offsetParent);
        return { x: offsetX, y: offsetY };
    },
}
