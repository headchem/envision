JD.Core.ParticleBuffer = {
	
	particles: [],
	
    add: function(particle)
    {
    	// do a binary tree insert on the z value here
		var idx = this.findInsertionPoint(this.particles, particle, this.numComparator);
		this.particles.splice(idx, 0, particle);
    },
    
    clear: function()
    {
    	//console.log(this.particles.length);
	    this.particles = [];
    },
    
    // http://stackoverflow.com/questions/3464815/insert-item-in-javascript-array-and-sort
    /**
	 * Find insertion point for a value val, as specified by the comparator 
	 * (a function)
	 * @param sortedArr The sorted array
	 * @param val The value for which to find an insertion point (index) in the array
	 * @param comparator The comparator function to compare two values
	 */
	findInsertionPoint: function (sortedArr, val, comparator) {   
	   var low = 0, high = sortedArr.length;
	   var mid = -1, c = 0;
	   while(low < high)   {
	      mid = parseInt((low + high)/2);
	      c = comparator(sortedArr[mid], val);
	      if(c < 0)   {
	         low = mid + 1;
	      }else if(c > 0) {
	         high = mid;
	      }else {
	         return mid;
	      }
	      //alert("mid=" + mid + ", c=" + c + ", low=" + low + ", high=" + high);
	   }
	   return low;
	},
	
	/**
	 * A simple number comparator
	 */
	numComparator: function (val1, val2)  {
	   if(val1.position.z > val2.position.z)   {
	      return -1;
	   }else if(val1.position.z < val2.position.z)   {
	      return 1;
	   }
	   return 0;
	}

}