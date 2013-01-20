JD.Core.Camera = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension) {
            this._super(JD.Core.Camera, arguments);

            this.rotation = 0;
            this.FOV = 750;
            
            // these values are set by game.js to dynamically adjust to the native screen dimensions
            this.stageW = 0;
            this.stageHalfW = 0;
            this.stageH = 0;
            this.horizonY = 0;
            
            this.type = 'Camera';
            this.name = 'camera';
            
            this.has(position);
            this.has(dimension);

            this.get3DPosition = function (obj)
            {
                var camPos = this.get('Position');
                //var camDim = this.get('Dimension');
                
                var pos = obj.position;
                var dim = obj.dimension;

                var axcx = pos.x - camPos.x;
                var aycy = -(pos.y - dim.h - camPos.y);
                var azcz = pos.z - camPos.z;

                var yt = this.rotation;
                var sin_yt = Math.sin(yt);
                var cos_yt = Math.cos(yt);
                
                var part2 = -(cos_yt * azcz + sin_yt * axcx);
                var ezdz = this.FOV / part2;
                var viewY = aycy * ezdz;
                
                var imgH = viewY - (aycy - dim.h) * ezdz;
                var imgW = dim.w * (imgH / dim.h);
                
                var imgLeft = this.stageHalfW - (cos_yt * axcx - sin_yt * azcz) * ezdz;
                var imgTop = viewY - imgH + this.horizonY;
                
                // in one test, allowing fractional pixels values resulted in ~22 fps. Forcing to whole numbers resulted in ~25 - both in FF and Chrome
                
                // does a cheap Math.floor()
                //imgW = imgW|imgW;
                //imgH = imgH|imgH;
                //imgTop = imgTop|imgTop;
                //imgLeft = imgLeft|imgLeft;
                
                return {imgW: imgW, imgH: imgH, imgTop: imgTop, imgLeft: imgLeft, viewZ: part2, distFromCam: azcz};
            };
            
            this.getHorizon = function()
            {
	            return (this.stageH - (this.stageH - this.horizonY));
            };
            
		    this.getHorizonHeight = function()
		    {
		        var result = this.stageH - (this.horizonY*((this.stageH/2) / this.stageH));
		        
		        result = (0.5 + result) | 0;
		        result = ~~ (0.5 + result);
		        result = (0.5 + result) << 0;
		        
		        return result;
		    };
            
            var camCollision = function(collidedWithObj)
            {
                if (collidedWithObj.name == 'box') // conditional response to the type of object collided (like if it's a bullet, then subtract health etc)
                {
                    // here, make the object that was collided with fully transparent, so as not to obscure the camera view
                    //console.log(collidedWithObj.name + ' ' + this.guid + ' collided with ' + collidedWithObj.guid);
                }
            }
            
            var collisionBox = JD.EntityState.CollisionBox3D.create(position, dimension, camCollision);
            this.has(collisionBox);
        }
    },
    
    tickAction: {
        value: function(delta) {
            
            var speed = 4.5;
            var rotSpeed = 0.01;

            var pos = this.get('Position');

            // camera y
            if (JD.UserInput.Keyboard.isDown(90)) // Z
            {
                pos.y = pos.y + (speed * delta);
                
                if (pos.y > 0)
                {
	                pos.y = 0;
                }
            }
            
            if (JD.UserInput.Keyboard.isDown(88)) // X
            {
                var pos = this.get('Position');
                pos.y = pos.y + (-speed * delta);
            }

            // rotation
            if (JD.UserInput.Keyboard.isDown(81)) // Q
            {
                this.rotation = this.rotation + (-rotSpeed * delta);
            }

            if (JD.UserInput.Keyboard.isDown(69)) // E
            {
                this.rotation = this.rotation + (rotSpeed * delta);
            }
            
            // FOV
            if (JD.UserInput.Keyboard.isDown(188)) // COMMA
            {
                this.FOV = this.FOV + (0.5 * delta);
            }
            
            if (JD.UserInput.Keyboard.isDown(190)) // PERIOD
            {
                this.FOV = this.FOV + (-0.5 * delta);
            }

            //JD.GameState.audioContext.listener.setPosition(0,0,0);

            JD.GameState.audioContext.listener.setPosition(pos.x, pos.y, pos.z);
            //this.audioContext.listener.setOrientation(vec.x, vec.y, vec.z, up.x, up.y, up.z);

            // this needs to be the direction vector the camera is pointing. Maybe use the current x,y,z and sin or cos stuff to pick a point directly in front of the position that accounts for camera rotation


            // LEFT OFF: I'm not setting the orientation vector properly...

            var hRadians = Math.abs(Math.cos(this.rotation) * 360) * (Math.PI/180);
            var vRadians = 0;

            var normX = Math.cos(vRadians) * Math.sin(hRadians);
            var normY = -Math.sin(vRadians);
            var normZ = Math.cos(vRadians) * Math.sin(hRadians);

            var upX = Math.sin(vRadians) * Math.sin(hRadians);
            var upY = Math.cos(vRadians);
            var upZ = Math.sin(vRadians) * Math.cos(hRadians);

            //JD.GameState.audioContext.listener.setOrientation(normX, normY, normZ, upX, upY, upZ);


            //JD.GameState.audioContext.listener.setOrientation(0,0,0,1,1,1);
            //console.log(pos.x + ',' + pos.y + ',' + pos.z + ' ' + upX + ',' + upY + ',' + upZ);
        }
    }
});