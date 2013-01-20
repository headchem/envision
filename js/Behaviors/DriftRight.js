JD.Behaviors.DriftRight = JD.Core.Component.extend(null, {
    _construct: {
        value: function(speed) {
            this._super(JD.Behaviors.DriftRight, arguments);
            this.type = 'DriftRight';
            this.isSingular = false;
            this.speed = speed;
        }
    },
    
    tickAction: {
        value: function(delta) {
            var pos = this.parent;
            
            if (!JD.GameState.IsPaused)
            {
                pos.x += delta;
            }
        }
    }
});