JD.Behaviors.DriftLeft = JD.Core.Component.extend(null, {
    _construct: {
        value: function(speed) {
            this._super(JD.Behaviors.DriftLeft, arguments);
            this.type = 'DriftLeft';
            this.isSingular = false;
            this.speed = speed;
        }
    },
    
    tickAction: {
        value: function(delta) {
            var pos = this.parent;
            
            if (!JD.GameState.IsPaused)
            {
                pos.x -= delta;
            }
        }
    }
});