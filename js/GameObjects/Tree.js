JD.GameObjects.Tree = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, hasAudio) {
            this._super(JD.GameObjects.Tree, arguments);
            
            this.name = 'tree';
            
            this.has(position);
            this.has(dimension);

            var trunkPos = JD.EntityState.Position.create(position.x, position.y, position.z);
            var trunkDim = JD.EntityState.Dimension.create(200, 1000, 200);
            var trunkColor = JD.EntityState.Color.create(100, 80, 30, 1.0);
            
            var trunk = JD.GameObjects.TreeTrunk.create(trunkPos, trunkDim, trunkColor);
            
            this.has(trunk);

            // attach audio source
            if (hasAudio)
            {
                var audio = JD.EntityState.Audio.create('sounds/position.wav', trunkPos.x, trunkPos.y, trunkPos.z);
                this.has(audio);
            }

            // create leaves

            var spacing = 180; // change this number, and the leaves are off...
            var iterations = 5;
            for(var x = trunkPos.x; x < trunkPos.x + iterations * spacing; x = x + spacing)
            {
                for(var y = trunkPos.y; y < trunkPos.y + iterations * spacing; y = y + spacing)
                {
                    for(var z = trunkPos.z; z < trunkPos.z + iterations * spacing; z = z + spacing)
                    {
                        var leafX = x - parseInt(dimension.w / 2) + parseInt(trunkDim.w / 2);
                        var leafY = y - dimension.h - dimension.h*0.3;
                        var leafZ = z - parseInt(dimension.d / 2) + parseInt(trunkDim.d / 2);

                        var leafPos = JD.EntityState.Position.create(leafX, leafY, leafZ);
                        var leafDim = JD.EntityState.Dimension.create(dimension.w / iterations, dimension.h / iterations, dimension.d / iterations);
                        var leafColor = JD.EntityState.Color.create(30, 120, 50, 0.5);
                        
                        var leaf = JD.GameObjects.TreeLeaf.create(leafPos, leafDim, leafColor);
                        
                        this.has(leaf);
                    }
                }
            }
            
        }
    }
});