JD.GameState = {
    type: 'GameState',
    IsSingular: true,
    
    IsPaused: false,

    collidables: [], // array of all objects that have registered themselves as collidable
    
    totalNumEntities: 0,

    audioContext: new webkitAudioContext()
};