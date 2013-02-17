JD.Behaviors.WASD = JD.Core.Component.extend(null, {
    _construct: {
        value: function(speed, moveWhilePaused) {
            this._super(JD.Behaviors.WASD, arguments);
            this.type = 'WASD';
            this.isSingular = false;
            this.speed = speed;
            this.moveWhilePaused = moveWhilePaused;
        }
    },
    
    tickAction: {
        value: function(delta) {
            var pos = this.parent; // Camera Position has a WASD
            var camera = pos.parent;
        
            if (!JD.GameState.IsPaused || this.moveWhilePaused)
            {	
            	var amount = delta * this.speed;
            	
	            if (JD.UserInput.Keyboard.isDown(87)) // W
	            {
	                pos.z = pos.z + amount;
	            }
	            
	            if (JD.UserInput.Keyboard.isDown(65)) // A
	            {
	                pos.x = pos.x - amount;
	            }
	            
	            if (JD.UserInput.Keyboard.isDown(83)) // S
	            {
	                pos.z = pos.z - amount;
	            }
	            
	            if (JD.UserInput.Keyboard.isDown(68)) // D
	            {
	                pos.x = pos.x + amount;
	            }
            }
        }
    }
});