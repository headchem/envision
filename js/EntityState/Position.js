JD.EntityState.Position = JD.Core.Component.extend(null, {
    _construct: {
        value: function(x, y, z, viewZ) {
            this._super(JD.EntityState.Position, arguments);
            this.type = 'Position';
            this.isSingular = true; // meaning any object can only have one Position object
            
            this.x = x;
            this.y = y;
            this.z = z;
            this.viewZ = viewZ;
        }
    }
});