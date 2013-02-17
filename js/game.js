function getScreenDimensions()
{
    var e = window;
    var a = 'inner';
    if ( !( 'innerWidth' in window ) )
    {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

window.onload = function()
{
    window.addEventListener('keyup', function(e) { JD.UserInput.Keyboard.onKeyup(e); }, false);
    window.addEventListener('keydown', function(e) { JD.UserInput.Keyboard.onKeydown(e); }, false);
    window.addEventListener('keypress', function(e) { JD.UserInput.Keyboard.onKeypress(e); }, false);

    var canvasEl = getEl('canvas');

    var initScreenDim;
    var screenW = 0;
    var screenH = 0;

    var camPos = JD.EntityState.Position.create(0,-3900,0);
    var camDim = JD.EntityState.Dimension.create(50,50,50);

    camPos.has(JD.Behaviors.WASD.create(50, true));
 
    var camera = JD.Core.Camera.create(camPos, camDim);
    var performance = JD.Core.Performance.create(60);

    function updateScreenDim()
    {
        initScreenDim = getScreenDimensions();

        screenW = initScreenDim.width;
        screenH = initScreenDim.height;

        canvasEl.width = screenW;
        canvasEl.height = screenH;

        camera.stageW = screenW;
        camera.stageH = screenH;
        camera.stageHalfW = screenW / 2;
        //camera.horizonY = screenH / 2;
        camera.horionY = 0;
    }

    updateScreenDim();

    window.onresize = function() {
        updateScreenDim();
    }

    var canvas = canvasEl.getContext("2d");
    var trees = []; // this should change to an array of all drawable (has Position and Dimension) entities?

    //trees.push(makeSimpleParticle(100,100,1000,1000,1000,1000, false));

    for(var i=0; i < 25; i++)
    {
        var areaW = 10000;
        var areaH = 10000;
        var areaD = 10000;

        var treeBaseW = 1000;
        var treeBaseH = 1000;
        var treeBaseD = 1000;

        var treeDimVariation = 5000;

        var treeX = parseInt(Math.random() * areaW) - areaW/2;
        var treeY = 0; //parseInt(Math.random() * areaH) - areaH/2;
        var treeZ = parseInt(Math.random() * areaD) - areaD/2;

        var treeW = parseInt(Math.random(treeDimVariation)) + treeBaseW;
        var treeH = parseInt(Math.random(treeDimVariation)) + treeBaseH;
        var treeD = parseInt(Math.random(treeDimVariation)) + treeBaseD;

        trees.push(makeTree(treeX,treeY,treeZ,treeW,treeH,treeD));
    }

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
        function(callback, element)
        {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
    

    
    //canvasEl.width = camera.stageW;
    //canvasEl.height = camera.stageH;
    
    var log = getEl('log');
    
    animate(new Date); // kicks off the animation loop
    
    function animate(time) {
        if (time === undefined){
          time = Date.now();
        }

        draw(time);
        
        requestAnimFrame(animate);
    }
    
    function draw(time) {
        
        var perf = performance.getInfo();
        var coeff = perf.coeff;
        var avgFPS = perf.averageFPS;
        
        /*
        avgFPS = (0.5 + avgFPS) | 0;
        avgFPS = ~~ (0.5 + avgFPS);
        avgFPS = (0.5 + avgFPS) << 0;
        */
        
        //avgFPS = (0.5 + (~~(0.5 + ((0.5 + avgFPS) | 0)))) << 0; // test if nesting everything instead of above hurts performance
        
        if (avgFPS <= 0)
        {
            avgFPS = 300;
        }
        
        log.innerHTML = 'fps:' + avgFPS + ' coeff: ' + coeff;
        camera.tick(coeff); // camera always ticks, so it can be moved around even when paused
    
        // clear background (more efficient to draw large bg color rect instead?)
        canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);
        //canvas.fillRect (0, 0, canvasEl.width, canvasEl.height);
        
        canvas.fillStyle = 'rgba(128,128,255,1.0)';
        
        var horizonY = camera.getHorizon();

        var horizonH = camera.getHorizonHeight();  
        
        
        canvas.fillRect (0, horizonY, camera.stageW, camera.stageH - horizonY);
        
        
        
        //canvas.fillRect (0, horizonY, canvasEl.width, 1000);
        
        for(var i=0;i<trees.length;i++) {
            trees[i].tick(coeff);
        }
        
        renderParticles();
    }
    
    function getEl(elId)
    {
        return document.getElementById(elId);
    }

    function makeTree(x, y, z, w, h, d, hasAudio)
    {
        var pos = JD.EntityState.Position.create(x,y,z);
        var dim = JD.EntityState.Dimension.create(w,h,d);

        return JD.GameObjects.Tree.create(pos, dim, hasAudio);
    }

    function makeSimpleParticle(x, y, z, w, h, d, hasAudio)
    {
        var pPos = JD.EntityState.Position.create(x, y, z);
        var pDim = JD.EntityState.Dimension.create(w,h,0);
        var pColor = JD.EntityState.Color.create(255, 128, 128, 1.0);

        return JD.GameObjects.SingleParticle.create(pPos, pDim, pColor);
    }

    function makeBox(name, x,y,z, w,h,d, isWanderer, isWindDrift, isExpander, isLeft, isWASD, attachCollide)
    {
        //var box = JD.Core.Component.create(name);
    
        var pos = JD.EntityState.Position.create(x,y,z);
        var dim = JD.EntityState.Dimension.create(w,h,d);
        var color = JD.EntityState.Color.create(255, 128, 0, 0.5);
        
        if (isLeft)
        {
            //var speed = Math.floor(Math.random()*11);
            //pos.has(JD.Behaviors.DriftLeft.create(speed));
        }
        
        if (isWASD)
        {
            //var speed = Math.floor(Math.random()*11);
            //pos.has(JD.Behaviors.WASD.create(speed));
        }
        
        var box = JD.GameObjects.Box.create(pos, dim, color);
        
        //box.toString = function() {
            //console.log(name + ' -- x: ' + pos.x + ' y: ' + pos.y + ' z: ' + pos.z + ' w: ' + dim.w + ' h: ' + dim.h + ' d: ' + dim.d);
        //}
        
        return box;
    }

	function renderParticles()
	{
        // this extra loop is needed for the viewZ sorting when the camera is rotated
        for (var i = 0; i < JD.Core.ParticleBuffer.particles.length; i++)
        {
            var obj = JD.Core.ParticleBuffer.particles[i];
            var render = camera.get3DPosition(obj);

            // create a temp var viewZ on the root particle obj to sort with
            // this is only needed if the camera has been rotated
            JD.Core.ParticleBuffer.particles[i].viewZ = render.viewZ;
        }

        JD.Core.ParticleBuffer.particles.sort(compareZ);

        var halfScreenWidth = screenW / 2;
        var fourthScreenWidth = halfScreenWidth / 4;
        var threeFourthScreenWidth = halfScreenWidth + fourthScreenWidth;
        var centerDepth = -6000;
        var centerFalloff = 3000;

        var centerUpperBound = centerDepth - centerFalloff;
        var centerLowerBound = centerDepth + centerFalloff;

		for (var i = 0; i < JD.Core.ParticleBuffer.particles.length; i++)
		{
			var obj = JD.Core.ParticleBuffer.particles[i];
			var pos = obj.position;
            var dim = obj.dimension;
            var color = obj.color;
            
            var alpha = color.a;
            
            var render = camera.get3DPosition(obj);

            // the viewZ is more negative as the object is further away from the camera
            //var viewLimit = -1500;
            //if (render.viewZ > viewLimit && render.viewZ <= 0)
            //{
                //var alphaFactor = render.viewZ / viewLimit;

                //alpha = alpha * alphaFactor;
            //}

            // now fade out particles in the line of sight to the character in the center

            if (render.viewZ > centerUpperBound)// || render.viewZ < centerLowerBound)
            {
                var centerMod = Math.abs(render.viewZ - (centerDepth)) / centerFalloff;

                //if (render.imgLeft > fourthScreenWidth && render.imgLeft < threeFourthScreenWidth)
                //{
                    var leftRightMod = Math.abs(halfScreenWidth - render.imgLeft) / halfScreenWidth;
                    alpha = alpha * Math.max(leftRightMod,centerMod);
                alpha *= alpha;
                //}
            }

            canvas.fillStyle = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', ' + alpha + ')';
            
            if (alpha > 0.01 && render.viewZ <= 0 && render.imgLeft > 0 && render.imgLeft + render.imgW < camera.stageW && render.imgTop - render.imgH > 0 && render.imgTop + render.imgH < camera.stageH) // view culling
            {
                canvas.fillRect (render.imgLeft, render.imgTop, render.imgW, render.imgH);
            }
		}
		
		JD.Core.ParticleBuffer.clear();
	}

    function compareZ(a,b) {
        if (a.viewZ < b.viewZ)
        {
            return -1;
        }
        if (a.viewZ > b.viewZ)
        {
            return 1;
        }
        return 0;
    }
}