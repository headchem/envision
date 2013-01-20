JD.GameObjects.TreeLeaf = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, color) {
            this._super(JD.GameObjects.TreeLeaf, arguments);
            
            this.name = 'treeleaf';
            this.type = 'TreeLeaf';
            
            this.has(position);
            this.has(dimension);

            // add slight randomization to color here

            var variation = 55;

            color.r = color.r + parseInt(Math.random() * variation);
            color.g = color.g + parseInt(Math.random() * variation);
            color.b = color.b + parseInt(Math.random() * variation);

            this.origRed = color.r;
            this.origGreen = color.g;
            this.origBlue = color.b;

            this.trueRed = color.r;
            this.trueGreen = color.g;
            this.trueBlue = color.b;

            // these are either 1 or -1
            this.redShimmerDir = 1;
            this.greenShimmerDir = 1;
            this.blueShimmerDir = 1;

            this.shimmerVariationLim = parseInt(Math.random() * 40);
            this.shimmerSpeedMod = 0.03;

            var particle = JD.GameObjects.Particle.create(position, dimension, color);
            
            this.has(color);

            this.has(particle);
        }
    }
    ,
    tickAction: {
        value: function(delta) {
            //console.log('ticking a tree leaf');
            var particles = this.get('Particle');

            for (var i = 0; i < particles.length; i++)
            {
                //console.log('ticking a tree leaf particle');
                var p = particles[i];

                if (this.trueRed > this.origRed + this.shimmerVariationLim)
                {
                    this.redShimmerDir = -1;
                }
                else if (this.trueRed < this.origRed - this.shimmerVariationLim)
                {
                    this.redShimmerDir = 1;
                }

                if (this.trueGreen > this.origGreen + this.shimmerVariationLim)
                {
                    this.greenShimmerDir = -1;
                }
                else if (this.trueGreen < this.origGreen - this.shimmerVariationLim)
                {
                    this.greenShimmerDir = 1;
                }

                if (this.trueBlue > this.origBlue + this.shimmerVariationLim)
                {
                    this.blueShimmerDir = -1;
                }
                else if (this.trueBlue < this.origBlue - this.shimmerVariationLim)
                {
                    this.blueShimmerDir = 1;
                }


                this.trueRed += this.redShimmerDir * delta * this.shimmerSpeedMod;
                this.trueGreen += this.greenShimmerDir * delta * this.shimmerSpeedMod;
                this.trueBlue += this.blueShimmerDir * delta * this.shimmerSpeedMod;

                if (this.trueRed > 255)
                {
                    this.trueRed = 255;
                }
                if (this.trueRed < 0)
                {
                    this.trueRed = 0;
                }

                if (this.trueGreen > 255)
                {
                    this.trueGreen = 255;
                }
                if (this.trueGreen < 0)
                {
                    this.trueGreen = 0;
                }

                if (this.trueBlue > 255)
                {
                    this.trueBlue = 255;
                }
                if (this.trueBlue < 0)
                {
                    this.trueBlue = 0;
                }



                p.color.r = parseInt(this.trueRed);
                p.color.g = parseInt(this.trueGreen);
                p.color.b = parseInt(this.trueBlue);

                //console.log('red: ' + p.color.r);

                //p.color.r = 255;

                /*
                 var boxPos = this.get('Position');
                 var pPos = p.position;//get('Position');
                 pPos.x = boxPos.x;
                 pPos.y = boxPos.y;
                 pPos.z = boxPos.z + (5 * i);
                 */
                //console.log('updating particles in box');
                // update each Particle with some variation of this parent Box pos, dim and color

            }
        }
    }
});