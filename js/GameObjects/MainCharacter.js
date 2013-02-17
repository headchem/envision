JD.GameObjects.MainCharacter = JD.Core.Component.extend(null, {
    _construct: {
        value: function(position, dimension, color) {
            this._super(JD.GameObjects.MainCharacter, arguments);

            this.type = 'MainCharacter';
            this.name = 'MainCharacter';

            this.speed = 13;

            this.has(position);
            this.has(dimension);
            this.has(color);

            var pPos = JD.EntityState.Position.create(position.x, position.y, position.z);
            var pDim = JD.EntityState.Dimension.create(dimension.w,dimension.h,0);
            var pColor = JD.EntityState.Color.create(color.r, color.g, color.b, color.a, true);

            var p = JD.GameObjects.Particle.create(pPos, pDim, pColor);

            this.has(p);
        }
    },

    tickAction: {
        value: function(delta) {
            var pos = this.get('Position');

            if (!JD.GameState.IsPaused)
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

                // now update all the particles involved in this object to reflect the change in position

                var particles = this.get('Particle');

                for (var i = 0; i < particles.length; i++)
                {
                    var p = particles[i];

                    p.position.x = pos.x;
                    p.position.y = pos.y;
                    p.position.z = pos.z;
                }

                //console.log('main char xyz: ' + pos.x + ',' + pos.y + ',' + pos.z + ' (' + amount + ')');
            }
        }
    }
});