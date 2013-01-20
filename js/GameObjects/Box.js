// Box should be a component like all the rest, it won't have renderable stuff in the Box object, but instead will be composed of child Particles, and the render loop when .tick() on each component, tests if the component.type == 'Particle' and only then actually renders anything. Every Particle will have its own Position and Dimension component (Dimension will never have a depth, though...) DOES BOX HAVE A TICK() METHOD? Needs to have one, so when it's called, it can update the values of its child Particles. When the Box position or dimension or color changes, need a way to pass those chagnes along to the Particles


JD.GameObjects.Box = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, color) {
            this._super(JD.GameObjects.Box, arguments);
            
            //this.parent = parent;
            this.type = 'Box';
            this.name = 'box';
            //this.position = position;
            //this.dimension = dimension;
            //this.color = color;
            //this.particles = [];
            
            this.has(position);
            this.has(dimension);
            this.has(color);
            
            // loop creating all the particle to visually represent this Box would be here
            
            var incrementSize = 3;
            
            for (var i = 0; i < dimension.d; i=i+incrementSize)
            {
                var pPos = JD.EntityState.Position.create(position.x, position.y, position.z + i);
                var pDim = JD.EntityState.Dimension.create(dimension.w,dimension.h,0);
                var pColor = JD.EntityState.Color.create(color.r - i, color.g, color.b, color.a);
                
                var p = JD.GameObjects.Particle.create(pPos, pDim, pColor);
                
                this.has(p);
            }
            
            var boxCollision = function(collidedWithObj)
            {
                //if (attachCollide)
                //{
                    if (collidedWithObj.name == 'box') // conditional response to the type of object collided (like if it's a bullet, then subtract health etc)
                    {
                        //console.log(collidedWithObj.name + ' ' + this.guid + ' collided with ' + collidedWithObj.guid);
                        
                        var particles = this.get('Particle');
                        
                        for (var i = 0; i < particles.length; i++)
                        {
                            var p = particles[i];
                            
                            p.color.b = 255;
                        }
                        
                    }
                //}
            }
            
            var collisionBox = JD.EntityState.CollisionBox3D.create(position, dimension, boxCollision);
            this.has(collisionBox);
        }
    }

    /*,

    tickAction: {
        value: function(delta) {
            var particles = this.get('Particle');

            //console.log('particle length: ' + particles.length);

            for (var i = 0; i < particles.length; i++)
            {
                var p = particles[i];
                p.color.b = 0;

                var boxPos = this.get('Position');
                var pPos = p.position;//get('Position');
                pPos.x = boxPos.x;
                pPos.y = boxPos.y;
                pPos.z = boxPos.z + (5 * i);
                //console.log('updating particles in box');
                // update each Particle with some variation of this parent Box pos, dim and color

            }
        }
    }*/
});