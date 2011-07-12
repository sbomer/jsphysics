function Drawing(id, scale) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.scale = scale || 40; //pixels per meter, larger zooms in
    this.resize();
}
Drawing.prototype = {
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    resize: function() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.width = this.canvas.width / this.scale;
        this.height = this.canvas.height / this.scale;
    },
    drawCircle: function(position, angle, radius) {
        var c = this.context;
        var x = this.canvas.width / 2 + this.scale * position.get(0);
        var y = this.canvas.height / 2 - this.scale * position.get(1);
        var r = this.scale * radius;
        var a = angle.get(0);
        c.beginPath();
        c.arc(x, y, r, 2 * Math.PI, false);
        c.fill();
        c.moveTo(x, y);
        c.lineTo(x + r * Math.cos(a), y - r * Math.sin(a));
        c.stroke();
    },
    offset: function() {
        var c = this.canvas;
        var offsetX = offsetY = 0;
        do {
            offsetX += c.offsetLeft;
            offsetY += c.offsetTop;
        } while (c = c.offsetParent);
        return { x: offsetX, y: offsetY };
    },
}
