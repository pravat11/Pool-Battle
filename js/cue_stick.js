function CueStick(){
	this.cueFromX;
	this.cueFromY;
	this.cueToX;
	this.cueToY;

	this.dirFromX;
	this.dirFromY;
	this.dirToX;
	this.dirToY;

	this.mouseX;
	this.mouseY;

	this.draw=function(mousePos){

		this.mouseX=mousePos.x;
		this.mouseY=mousePos.y;

		var point;
		var dist=this._getDistance(pool.whiteBall.x,pool.whiteBall.y,mousePos.x,mousePos.y);
		if(dist>1000)
			point=this.getInternalDivisionPoint(pool.whiteBall.x,pool.whiteBall.y,mousePos.x,mousePos.y,1000,dist-1000);
		else
			point=this.getExternalDivisionPoint(pool.whiteBall.x,pool.whiteBall.y,mousePos.x,mousePos.y,1000,1000-dist);

		this.dirFromX=pool.whiteBall.x;
		this.dirFromY=pool.whiteBall.y;

		this.dirToX=point.x;
		this.dirToY=point.y;

		dist=this._getDistance(pool.whiteBall.x,pool.whiteBall.y,this.dirToX,this.dirToY);
		point=this.getExternalDivisionPoint(pool.whiteBall.x,pool.whiteBall.y,this.dirToX,this.dirToY,pool.whiteBall.radius+10,dist+pool.whiteBall.radius+10);

		this.cueFromX=point.x;
		this.cueFromY=point.y;

		dist=this._getDistance(pool.whiteBall.x,pool.whiteBall.y,point.x,point.y);
		point=this.getExternalDivisionPoint(pool.whiteBall.x,pool.whiteBall.y,point.x,point.y,400+dist,400);

		this.cueToX=point.x;
		this.cueToY=point.y;

		if((powerMeter.style.height===undefined)||isNaN(parseInt(powerMeter.style.height))) powerMeter.style.height=80+'%';
		var shotPower=parseInt(powerMeter.style.height)/1.8;

		pool.whiteBall.vx=((this.cueFromX-this.cueToX)/1000)*shotPower;
		pool.whiteBall.vy=((this.cueFromY-this.cueToY)/1000)*shotPower;

	}

	this.getInternalDivisionPoint=function(x1,y1,x2,y2,m,n){
		return {
			x:(m*x2+n*x1)/(m+n),
			y:(m*y2+n*y1)/(m+n)
		};
	}

	this.getExternalDivisionPoint=function(x1,y1,x2,y2,m,n){
		return {
			x:(m*x2-n*x1)/(m-n),
			y:(m*y2-n*y1)/(m-n)
		};
	}

	this.getPositionUptoInternal=function(mousePos){
		var x1=this.fromX,y1=this.fromY,x2=mousePos.x,y2=mousePos.y;
		var m,n;
		var dist=this._getDistance(x1,y1,x2,y2);
		if(dist>1000) {
			m=1000;n=dist-m;
			return {
				x:(m*x2+n*x1)/(m+n),
				y:(m*y2+n*y1)/(m+n)
			};
		}
		else {
			m=1000;n=m-dist;
			return {
				x:(m*x2-n*x1)/(m-n),
				y:(m*y2-n*y1)/(m-n)
			};
		}
	}

	this.getPositionUptoExternal=function(x2,y2){
		var x1=this.fromX,y1=this.fromY;
		var dist=this._getDistance(x1,y1,x2,y2);
			var m=400,n=m+dist;
			return {
				x:(m*x2-n*x1)/(m-n),
				y:(m*y2-n*y1)/(m-n)
			};
	}

	this._getDistance=function(x1,y1,x2,y2){
		return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	}

	this.getMousePos=function(canvas,evt){
		var rect = canvas.getBoundingClientRect(), // abs. size of element
	      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
	      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

	  return {
	    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
	    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	  }	
	}
}