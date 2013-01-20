JD.UserInput.Keyboard = {
    _pressed: {},
    _toggled: {},
    
    P: 112,
    O: 111,
    
    isDown: function(keyCode) {
        
        var returnVal = false;
        
        if (this._pressed[keyCode] != undefined && this._pressed[keyCode] == true)
        {
            returnVal = true;
        }

        return returnVal;
    },
    
    isToggled: function(keyCode) {
        return this._toggled['toggled:' + keyCode];
    },
    
    toggle: function(keyCode) {
        if (this._toggled['toggled:' + keyCode])
        {
            this._toggled['toggled:' + keyCode] = !this._toggled['toggled:' + keyCode];
        }
        else
        {
            this._toggled['toggled:' + keyCode] = true;
        }
    },
    
    onKeydown: function(e) {
        var key = e ? e.which : window.event.keyCode;
        this._pressed[key] = true;
    },
    
    onKeyup: function(e) {
        var key = e ? e.which : window.event.keyCode;
        delete this._pressed[key];
    },
    
    onKeypress: function(e) {
        var key = e ? e.which : window.event.keyCode;
        
        //console.log('keypressed: ' + key);
        
        this.toggle(key);
        
        if (key == this.P)
        {
            JD.GameState.IsPaused = this.isToggled(key);
        }
        
        //console.log('IsPaused: ' + JD.GameState.IsPaused);
    }
};

