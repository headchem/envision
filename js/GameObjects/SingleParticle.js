JD.GameObjects.SingleParticle = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, color) {
            this._super(JD.GameObjects.SingleParticle, arguments);

            this.type = 'SingleParticle';
            this.name = 'SingleParticle';

            this.has(position);
            this.has(dimension);
            this.has(color);

                var pPos = JD.EntityState.Position.create(position.x, position.y, position.z);
                var pDim = JD.EntityState.Dimension.create(dimension.w,dimension.h,0);
                var pColor = JD.EntityState.Color.create(color.r, color.g, color.b, color.a);

                var p = JD.GameObjects.Particle.create(pPos, pDim, pColor);

                this.has(p);
        }
    }
});