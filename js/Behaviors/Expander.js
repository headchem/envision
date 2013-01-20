JD.Behaviors.Expander = JD.Core.Component.extend(null, {
    _construct: {
        value: function(speed) {
            this._super(JD.Behaviors.Expander, arguments);
            this.type = 'Expander';
            this.isSingular = false;
            this.speed = speed;
        }
    },
    
    tickAction: {
        value: function(delta) {
            var dim = this.parent;
            dim.w += delta;
            dim.h += delta;
            dim.d -= delta;
        }
    }
});