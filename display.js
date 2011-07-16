function Display(id, scale) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.scale = scale || 40; //pixels per meter, larger zooms in
    this.resize();
    this.listen();
}
Display.prototype = {
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    resize: function() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    },
    listen: function() {
        var that = this;
        var f = function() {
            that.resize();
        };
        window.addEventListener('resize', f, false);
    },
    drawCircle: function(position, angle, radius) {
        var c = this.context;
        var p = this.toDisplay(position);
        var x = p.get(0);
        var y = p.get(1);
        var r = this.scale * radius;
        var a = angle.get(0);
        c.beginPath();
        c.arc(x, y, r, 2 * Math.PI, false);
        c.fill();
        c.moveTo(x, y);
        c.lineTo(x + r * Math.cos(a), y - r * Math.sin(a));
        c.stroke();
    },
    toDisplay: function(v) {
        var x = this.canvas.width / 2 + this.scale * v.get(0);
        var y = this.canvas.height / 2 - this.scale * v.get(1);
        return new Vector(x, y);
    },
    toWorld: function(v) {
        var x = v.get(0) - this.canvas.width / 2;
        var y = this.canvas.height / 2 - v.get(1);
        return new Vector(x, y).times(1 / this.scale);
    },
    getClick: function(event) {
        var x = event.pageX - this.offset().x;
        var y = event.pageY - this.offset().y;
        return this.toWorld(new Vector(x, y));
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
