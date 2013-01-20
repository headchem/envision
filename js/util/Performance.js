JD.Core.Performance = BaseObject.extend({

    goalFPS: 0,
    oldTime: undefined,
    paused: false,
    iterCount: 0,
    totalFPS: 0,
    totalCoeff: 0,
    
    _construct: function(goalFPS) {
        this.goalFPS = goalFPS;
        this.oldTime = +new Date();
    },
    
    getInfo: function()
    {
        var newTime = +new Date();
        
        var elapsed = newTime - this.oldTime;
        
        this.oldTime = newTime;
        
        var FPS = 1000 / elapsed;
        
        if (this.iterCount > 120) // reset the average every second or so
        {
            this.iterCount = 0;
            this.totalFPS = 0;
            this.totalCoeff = 0;
        }
        
        this.iterCount++;
        this.totalFPS += FPS;
        var coeff = this.goalFPS / FPS;
        this.totalCoeff += coeff;
        
        var data =
        {
            elapsed: elapsed,
            coeff: this.goalFPS / FPS,
            FPS: FPS,
            averageFPS: this.totalFPS / this.iterCount,
            averageCoeff: this.totalCoeff / this.iterCount
        };

        return data;
    }
    
});