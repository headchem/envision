JD.GameObjects.TreeTrunk = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, color) {
            this._super(JD.GameObjects.TreeTrunk, arguments);
            
            this.name = 'treetrunk';
            //this.type = 'TreeTrunk';
            
            this.has(position);
            this.has(dimension);

            // add slight randomization to color here
            this.has(color);

            var boxCollision = function(collidedWithObj)
            {
                if (collidedWithObj.name != 'treeleaf')
                {
                    //console.log(collidedWithObj.name + ' ' + this.guid + ' collided with ' + collidedWithObj.guid);
                }
            }
            
            var collisionBox = JD.EntityState.CollisionBox3D.create(position, dimension, boxCollision);
            this.has(collisionBox);

            var particle = JD.GameObjects.Particle.create(position, dimension, color);
            this.has(particle);
        }
    }
});