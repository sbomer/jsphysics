function Display(id, scale) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.scale = scale || 40; //pixels per meter, larger zooms in
    this.resize();
    this.listen();
}
Display.prototype = {
    clear: function() {
        var x = this.canvas.width / this.scale;
        var y = this.canvas.height / this.scale;
        this.context.clearRect(-x, -y, 2 * x, 2 * y);
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
        c.beginPath();
        c.arc(x, y, r, 2 * Math.PI, false);
        c.closePath();
        c.fill();
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x + r * Math.cos(a), y - r * Math.sin(a));
        c.closePath();
        c.strokeStyle = new Color(255, 255, 255, 0.5).toString();
        c.lineWidth = 4;
        c.stroke();
    },
    drawSquare: function(position, angle, radius) {
        var c = this.context;
        var x = position.get(0);
        var y = position.get(1);
        var r = radius;
        var a = angle.get(0);
        c.beginPath();
        c.rect(x - r, y - r, 2 * r, 2 * r);
        c.fill();
        c.closePath();
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
