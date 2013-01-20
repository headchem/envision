JD.Core.RootObj = BaseObject.extend({
    type: '', // these will be the high level types like 'physics', 'audio', 'ai'
    name: '',
    description: '',
    guid: 0,
    _construct: function(name) {
        this.name = name;
        
        JD.GameState.totalNumEntities++;
        this.guid = JD.GameState.totalNumEntities;
        
    }
});


JD.Core.Component = JD.Core.RootObj.extend(null, {
    
    _construct: {
        value: function(name) {
            this._super(JD.Core.Component, arguments);
            
            this.components = new Object(); // it's a hash not an array
        }
    },
    
    tick: {
        value: function(delta) {
            for(var i in this.components) {
                var compArr = this.components[i];
                
                for(var j in compArr)
                {
                    //console.log('tick for ' + i + ' ' + j);
                    var c = compArr[j];

                        c.tick(delta);

                        if (this.tickAction)
                        {
                            this.tickAction(delta);
                        }

                        if (c.tickAction) {
                            c.tickAction(delta);
                        }

                        if (c.type == 'Particle')
                        {
                            JD.Core.ParticleBuffer.add(c);
                        }
                }
            }
        }
    },
    
    tickAction: {
        value: null, writable: true
    },

    has: {
        value: function(comp) {
            if (!this.components[comp.type])
            {
                this.components[comp.type] = []; // each component is actually an array that can hold many of the same type of component (like multiple 'physics' or 'ai')
            }
            
            comp.parent = this;
            this.components[comp.type].push(comp);
        }
    },
    
    get: {
        value: function(type) { // seems like a bad idea to have two different return types, but feels like it'll make code closer to the surface more readable...
        
            if (this.components[type])
            {
                if (this.components[type][0] && this.components[type][0].isSingular)
                {
                    return this.components[type][0];
                }
                return this.components[type]; // returns an array of components of the specified type
            }
        }
    },
    
    components: {
        value: null, enumerable: true, writable: true
    },
    
    parent: {
        value: null, writable: true
    }
});