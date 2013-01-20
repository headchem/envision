JD.Behaviors.WindDrift = JD.Core.Component.extend(null, {
    _construct: {
        value: function(speed) {
            this._super(JD.Behaviors.WindDrift, arguments);
            this.type = 'WindDrift';
            this.isSingular = false;
            this.speed = speed;
        }
    },
    
    tickAction: {
        value: function(delta) {
            var pos = this.parent;
            
            var mod = 2;
            var rand = Math.random();
            
            if (rand > 0.5)
            {
                pos.x += delta * mod;
                pos.y -= delta * mod;
                pos.z += delta * mod;
            }
            else
            {
                pos.x += delta * mod;
                pos.y -= delta * mod;
                pos.z -= delta * mod;
            }
        }
    }
});