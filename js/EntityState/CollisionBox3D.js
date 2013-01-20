JD.EntityState.CollisionBox3D = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, collisionAction) {
            this._super(JD.EntityState.CollisionBox3D, arguments);
            
            //this.parent = parent;
            this.type = 'CollisionBox3D';
            this.isSingular = true; // meaning any object can only have one CollisionBox3D object
            
            JD.GameState.collidables.push(this); // pushes what should be the root object, containing a Position and Dimension component
            
            console.log('num of collidables: ' + JD.GameState.collidables.length);
            
            this.position = position;
            this.dimension = dimension;
            this.collisionAction = collisionAction;
        }
    },
    
    tickAction: {
        value: function(delta) { // this.parent must have all the properties this function messes with
            // loop through all registered collidable components, and test for collision. If collision is detected, 
            
            // http://gmc.yoyogames.com/index.php?showtopic=536001

            for (var i = 0; i < JD.GameState.collidables.length; i++)
            {
                var collidedWithObj = JD.GameState.collidables[i];
                
                if (collidedWithObj.guid != this.guid)
                {
                    var c1W = parseInt(this.dimension.w);
                    var c1H = parseInt(this.dimension.h);
                    var c1D = parseInt(this.dimension.d);
                    
                    var c1x1 = parseInt(this.position.x);
                    var c1y1 = parseInt(this.position.y);
                    var c1z1 = parseInt(this.position.z);
                    
                    var c1x2 = c1x1 + c1W;
                    var c1y2 = c1y1 + c1H;
                    var c1z2 = c1z1 + c1D;
            
                    var testPos = collidedWithObj.parent.get('Position');
                    var testDim = collidedWithObj.parent.get('Dimension');
            
                    var c2W = parseInt(testDim.w);
                    var c2H = parseInt(testDim.h);
                    var c2D = parseInt(testDim.d);
            
                    var c2x1 = parseInt(testPos.x);
                    var c2y1 = parseInt(testPos.y);
                    var c2z1 = parseInt(testPos.z);
                    
                    var c2x2 = c2x1 + c2W;
                    var c2y2 = c2y1 + c2H;
                    var c2z2 = c2z1 + c2D;
                    
                    var collides = false;
                    
                    var x1 = Math.max(c1x1,c2x1);
                    var x2 = Math.min(c1x2,c2x2);
                    
                    var y1 = Math.max(c1y1,c2y1);
                    var y2 = Math.min(c1y2,c2y2);
                    
                    var z1 = Math.max(c1z1,c2z1);
                    var z2 = Math.min(c1z2,c2z2);
                    
                    if (x1 <= x2 && y1 <= y1 && z1 <= z2)
                    {
                        //console.log('collision! this type: ' + this.type + ' ' + this.parent.guid + ' + ' + collidedWithObj.parent.guid);
                        this.collisionAction.call(this.parent, collidedWithObj.parent);
                    }
                    else
                    {
                        //console.log('no collision. this type: ' + this.type + ' ' + this.parent.guid + ' + ' + collidedWithObj.guid);
                    }
                }
            }
        }
    }
});