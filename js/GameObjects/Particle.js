JD.GameObjects.Particle = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, color) {
            this._super(JD.GameObjects.Particle, arguments);
            this.type = 'Particle';
            this.position = position;
            this.dimension = dimension;
            this.color = color;
            this.isSingular = false;
            
            //this.has(position);
            //this.has(dimension);
            //this.has(color);
        }
    }
});