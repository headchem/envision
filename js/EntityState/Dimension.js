JD.EntityState.Dimension = JD.Core.Component.extend(null, {
    _construct: {
        value: function(w, h, d) {
            this._super(JD.EntityState.Dimension, arguments);
            this.type = 'Dimension';
            this.isSingular = true;
            
            this.w = w;
            this.h = h;
            this.d = d;
        }
    }
});