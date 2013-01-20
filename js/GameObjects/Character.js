JD.GameObjects.Character = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension) {
            this._super(JD.GameObjects.Box, arguments);
            
            this.name = 'character';
            
            this.has(position);
            this.has(dimension);
            
            var bodyPos = JD.EntityState.Position.create(position.x, position.y, position.z);
            var bodyDim = JD.EntityState.Dimension.create(50, 200, 50);
            var bodyColor = JD.EntityState.Color.create(100, 80, 30, 0.7);
            
            var body = JD.GameObjects.Box.create(bodyPos, bodyDim, bodyColor);
            
            this.has(body);
        }
    }
});