JD.EntityState.Color = JD.Core.Component.extend(null, {
    _construct: {
        value: function(r, g, b, a) {
            this._super(JD.EntityState.Color, arguments);
            this.type = 'Color';
            this.isSingular = true; // meaning any object can only have one Position object
            
            this.r = Math.floor(r);
            this.g = Math.floor(g);
            this.b = Math.floor(b);
            this.a = a;
        }
    }
});