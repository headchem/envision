JD.Behaviors.AimlessWander = JD.Core.Component.extend(null, {
    _construct: {
        value: function(speed) {
            this._super(JD.Behaviors.AimlessWander, arguments);
            this.type = 'AimlessWander';
            this.isSingular = false;
            this.speed = speed;
        }
    },
    
    tickAction: {
        value: function(delta) { // this.parent must have all the properties this function messes with
            var pos = this.parent;
            
            var mod = 2;
            
            pos.x -= delta * mod;
            pos.y += delta * mod;
            pos.z += delta * mod;
        }
    }
});