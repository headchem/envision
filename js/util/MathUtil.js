JD.Core.MathUtil = BaseObject.extend({

    round: function(val) {
        val = (0.5 + val) | 0;
        val = ~~ (0.5 + val);
        val = (0.5 + val) << 0;
        
        return val;
    },
    
    _construct: function() {
        
    }
    
});