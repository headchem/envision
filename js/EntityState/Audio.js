JD.EntityState.Audio = JD.Core.Component.extend(null, {
    _construct: {
        value: function(url, x, y, z) {
            this._super(JD.EntityState.Audio, arguments);
            this.type = 'Audio';
            this.x = x;
            this.y = y;
            this.z = z;


            this.loader = new BufferLoader(JD.GameState.audioContext, [url], x, y, z, function(buffers) {
                this.source = JD.GameState.audioContext.createBufferSource();
                this.source.buffer = buffers[0];
                this.source.loop = true;

                this.panner = JD.GameState.audioContext.createPanner();

                this.panner.setPosition(this.x, this.y, this.z);

                this.panner.coneOuterGain = 100;
                this.panner.coneOuterAngle = 180; // change to less than 360 for directional speaker cone
                this.panner.coneInnerAngle = 1;

                // Set the panner node to be at the origin looking in the +x
                // direction.

                this.panner.connect(JD.GameState.audioContext.destination);
                this.source.connect(this.panner);
                this.source.noteOn(0);

                console.log('playing audio');
            });
            this.loader.load();


        }
    }
});