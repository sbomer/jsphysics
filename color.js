function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 1;
}
Color.prototype = {
    toString: function() {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    },
};
