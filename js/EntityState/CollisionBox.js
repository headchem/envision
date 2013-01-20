JD.EntityState.CollisionBox2D = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, collisionAction) {
            this._super(JD.EntityState.CollisionBox2D, arguments);
            
            //this.parent = parent;
            this.type = 'CollisionBox2D';
            this.isSingular = true; // meaning any object can only have one CollisionBox object
            
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
            
            for (var i = 0; i < JD.GameState.collidables.length; i++)
            {
                var collidedWithObj = JD.GameState.collidables[i];
                
                if (collidedWithObj.guid != this.guid)
                {
                    var testPos = collidedWithObj.parent.get('Position');
                    var testDim = collidedWithObj.parent.get('Dimension');
                    
                    
                    var thisX = parseInt(this.position.x);
                    var thisY = parseInt(this.position.y);
                    var thisW = parseInt(this.dimension.w);
                    var thisH = parseInt(this.dimension.h);
                    
                    var testX = parseInt(testPos.x);
                    var testY = parseInt(testPos.y);
                    var testW = parseInt(testDim.w);
                    var testH = parseInt(testDim.h);

                    if (thisX < testX + testW && thisX + thisW > testX && thisY < testY + testH && thisY + thisH > testY)
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