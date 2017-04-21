var boundaryX=1200,	boundaryY=610;
var initialFoulChecked=false;
var colorSet=false;
var canvasText=document.getElementsByClassName('canvas-texts')[0];
var collisionOccured=false;

function Animate(){
	var that=this;
	this.animationId;

	this.init=function(){
		this.animationId=window.requestAnimationFrame(that.init);
		if(pool.player1.turn) {
			p1.style.fontWeight='bold';
			p1.style.fontSize='20px';
			p2.style.fontWeight='normal';
			p2.style.fontSize='16px';
		}
		else if(pool.player2.turn) {
			p2.style.fontWeight='bold';
			p2.style.fontSize='20px';
			p1.style.fontWeight='normal';
			p1.style.fontSize='16px';
		}
		if(colorSet) {
			p1Indicator.style.backgroundColor=pool.player1.playerColor;
			p2Indicator.style.backgroundColor=pool.player2.playerColor;
		}
    	that.clearCanvas();
		that.initBalls();
		that.checkIfReleased();

	}

	this.clearCanvas=function(){
		ctx.clearRect(0,0,boundaryX,boundaryY);

		//D-area
		ctx.beginPath();
		ctx.arc(295,300,100,0.5*Math.PI,1.5*Math.PI);
		ctx.stroke();
		ctx.closePath();

		ctx.moveTo(295,boundTop);
		ctx.lineTo(295,boundBottom);
		ctx.stroke();

		// ctx.beginPath();
		// ctx.arc(boundLeft-35,boundTop-35,75,0,2*Math.PI);
		// ctx.stroke();
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.arc(boundRight+35,boundTop-35,75,0,2*Math.PI);
		// ctx.stroke();
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.arc(boundLeft-35,boundBottom+35,75,0,2*Math.PI);
		// ctx.stroke();
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.arc(boundRight+35,boundBottom+35,75,0,2*Math.PI);
		// ctx.stroke();
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.arc(canvas.width/2,boundTop-195,200,0,2*Math.PI);
		// ctx.stroke();
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.arc(canvas.width/2,boundBottom+195,200,0,2*Math.PI);
		// ctx.stroke();
		// ctx.closePath();


		// ctx.moveTo(boundLeft+40,boundTop+2);
		// ctx.lineTo(canvas.width/2-30,boundTop+2);
		// ctx.stroke();

		// ctx.moveTo(boundRight-40,boundTop+2);
		// ctx.lineTo(canvas.width/2+30,boundTop+2);
		// ctx.stroke();

		// ctx.moveTo(boundLeft+40,boundBottom-2);
		// ctx.lineTo(canvas.width/2-30,boundBottom-2);
		// ctx.stroke();

		// ctx.moveTo(boundRight-40,boundBottom-2);
		// ctx.lineTo(canvas.width/2+30,boundBottom-2);
		// ctx.stroke();

		// ctx.moveTo(boundLeft+2,boundTop+40);
		// ctx.lineTo(boundLeft+2,boundBottom-40);
		// ctx.stroke();

		// ctx.moveTo(boundRight-2,boundTop+40);
		// ctx.lineTo(boundRight-2,boundBottom-40);
		// ctx.stroke();

		// ctx.moveTo(canvas.width/2-35,boundTop+10);
		// ctx.lineTo(canvas.width/2+35,boundTop+10);
		// ctx.stroke();

	}

	this.initBalls=function(){
		this._initRedBalls();
		this._initYellowBalls();
		this._initWhiteBall();
		this._initBlackBall();
	}

	this._initRedBalls=function(){
		for(i=0;i<pool.redBalls.length;i++) {
			ctx.beginPath();
			ctx.arc(pool.redBalls[i].x,pool.redBalls[i].y,pool.redBalls[i].radius,0,Math.PI * 2, false);
			var grd=ctx.createRadialGradient(pool.redBalls[i].x,pool.redBalls[i].y,0,pool.redBalls[i].x,pool.redBalls[i].y,pool.redBalls[i].radius);
			grd.addColorStop(0,"white");
			grd.addColorStop(1,pool.redBalls[i].color);
			ctx.fillStyle=grd;
			ctx.save();
			ctx.shadowBlur=10;
			ctx.shadowColor="rgb(0,0,0)";
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 2;
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
	}
	this._initYellowBalls=function(){
		for(i=0;i<pool.yellowBalls.length;i++) {
			ctx.beginPath();
			ctx.arc(pool.yellowBalls[i].x,pool.yellowBalls[i].y,pool.yellowBalls[i].radius,0,Math.PI * 2, false);
			var grd=ctx.createRadialGradient(pool.yellowBalls[i].x,pool.yellowBalls[i].y,0,pool.yellowBalls[i].x,pool.yellowBalls[i].y,pool.yellowBalls[i].radius);
			grd.addColorStop(0,"white");
			grd.addColorStop(1,pool.yellowBalls[i].color);
			ctx.fillStyle=grd;
			ctx.save();
			ctx.shadowBlur=10;
			ctx.shadowColor="rgb(0,0,0)";
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 2;
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
	}
	this._initBlackBall=function(){
		ctx.beginPath();
		ctx.arc(pool.blackBall.x,pool.blackBall.y,pool.blackBall.radius,0,Math.PI * 2, false);
		var grd=ctx.createRadialGradient(pool.blackBall.x,pool.blackBall.y,0,pool.blackBall.x,pool.blackBall.y,pool.blackBall.radius);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,pool.blackBall.color);
		ctx.fillStyle=grd;
		ctx.save();
		ctx.shadowBlur=10;
		ctx.shadowColor="rgb(0,0,0)";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	this._initWhiteBall=function(){
		ctx.beginPath();
		ctx.arc(pool.whiteBall.x,pool.whiteBall.y,pool.whiteBall.radius,0,Math.PI * 2, false);
		var grd=ctx.createRadialGradient(pool.whiteBall.x,pool.whiteBall.y,0,pool.whiteBall.x,pool.whiteBall.y,pool.whiteBall.radius);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,pool.whiteBall.color);
		ctx.fillStyle=grd;
		ctx.save();
		ctx.shadowBlur=10;
		ctx.shadowColor="rgb(0,0,0)";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	this.initializeCue=function() {
		ctx.beginPath();
		ctx.moveTo(pool.cue.dirFromX,pool.cue.dirFromY);
		ctx.lineWidth=2;
		ctx.setLineDash([5,3]);
		ctx.lineTo(pool.cue.mouseX,pool.cue.mouseY);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.lineWidth=10;
		ctx.setLineDash([0,0]);
		ctx.save();
		ctx.shadowBlur=10;
		ctx.shadowColor="rgb(0,0,0)";
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.moveTo(pool.cue.cueFromX,pool.cue.cueFromY);
		ctx.lineTo(pool.cue.cueToX,pool.cue.cueToY);
		ctx.stroke();
		ctx.restore();
		ctx.closePath();

		ctx.beginPath();
		ctx.save();
		ctx.lineWidth=10;
		ctx.setLineDash([2,3]);
		var point=pool.cue.getInternalDivisionPoint(pool.cue.cueFromX,pool.cue.cueFromY,pool.cue.cueToX,pool.cue.cueToY,800,200);
		ctx.moveTo(point.x,point.y);
		ctx.lineTo(pool.cue.cueToX,pool.cue.cueToY);
		ctx.strokeStyle='red';
		ctx.stroke();
		ctx.restore();
		ctx.closePath();

		ctx.beginPath();
		ctx.save();
		ctx.lineWidth=10;
		ctx.setLineDash([0,0]);
		var point=pool.cue.getInternalDivisionPoint(pool.cue.cueFromX,pool.cue.cueFromY,pool.cue.cueToX,pool.cue.cueToY,20,980);
		ctx.moveTo(pool.cue.cueFromX,pool.cue.cueFromY);
		ctx.lineTo(point.x,point.y);
		ctx.strokeStyle='cyan';
		ctx.stroke();
		ctx.restore();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(pool.cue.mouseX,pool.cue.mouseY,pool.whiteBall.radius,0,Math.PI * 2,false);
		ctx.lineWidth=1;
		ctx.stroke();
		ctx.closePath();

	}

	this.checkIfReleased=function(){

		if(pool.whiteBall.flag==1){	
			this.setWhiteBallAnimation();
			this.setOtherBallsAnimation();
			if(this.checkIfNear())	this.checkCollisions();
			this.checkBoundaries();
			this.checkIfPotted();
			this.checkIfBallsStopped();
		}
		else {
			if(pool.ballsArray[0].statusFlag=='inTable')
				this.initializeCue();
		}
	}

	this.setOtherBallsAnimation=function(){

		for(i=1;i<pool.ballsArray.length;i++) {
			
			pool.ballsArray[i].x += pool.ballsArray[i].vx;
			pool.ballsArray[i].y += pool.ballsArray[i].vy;
			
			// friction
			pool.ballsArray[i].vx *= friction;
			pool.ballsArray[i].vy *= friction;

		}
	}

	this.setWhiteBallAnimation=function(){
		pool.whiteBall.x += pool.whiteBall.vx;
		pool.whiteBall.y += pool.whiteBall.vy;
		pool.whiteBall.vx *= friction;
		pool.whiteBall.vy *= friction;
	}	

	this.displayFouledMessage=function(){
		initialFoulChecked=false;

		if(pool.player1.turn) {
			if(!collisionOccured) pool.player1.fouled=true;
			collisionOccured=false;
			var isPotted=false;
			for(i=0;i<pool.ballsArray.length;i++) {
				if(pool.ballsArray[i].statusFlag=='potted') {
					isPotted=true;
					break;
				}
			}
			if(isPotted) {
				if(pool.player1.fouled) {
					canvasText.style.display='inline';
					canvasText.innerHTML='Foul';
					setTimeout(function(){
						canvasText.innerHTML='';
						canvasText.style.display='none';
					},3000);
					pool.player1.turn=false;
					pool.player2.turn=true;
					pool.player1.fouled=false;	
				}			
			}
			else {
				if(pool.player1.fouled) {
					canvasText.style.display='inline';
					canvasText.innerHTML='Foul';
					setTimeout(function(){
						canvasText.innerHTML='';
						canvasText.style.display='none';
					},3000);
					pool.player1.fouled=false;
				}
				pool.player1.turn=false;
				pool.player2.turn=true;	
			}
		}
		else if(pool.player2.turn) {
			var isPotted=false;
			if(!collisionOccured) pool.player2.fouled=true;
			collisionOccured=false;
			for(i=0;i<pool.ballsArray.length;i++) {
				if(pool.ballsArray[i].statusFlag=='potted') {
					isPotted=true;
					break;
				}
			}
			if(isPotted) {
				if(pool.player2.fouled) {
					canvasText.style.display='inline';
					canvasText.innerHTML='Foul';
					setTimeout(function(){
						canvasText.innerHTML='';
						canvasText.style.display='none';
					},3000);
					pool.player2.turn=false;
					pool.player1.turn=true;	
					pool.player2.fouled=false;
				}			
			}
			else {
				if(pool.player2.fouled) {
					canvasText.style.display='inline';
					canvasText.innerHTML='Foul';
					setTimeout(function(){
						canvasText.innerHTML='';
						canvasText.style.display='none';
					},3000);
					pool.player2.fouled=false;
				}
				pool.player2.turn=false;
				pool.player1.turn=true;	
			}
		}
	}

	this.checkIfBallsStopped=function() {
		var flag=false;
		for(i=0;i<pool.ballsArray.length;i++) {
			if(pool.ballsArray[i].vx.toFixed(1)!=0||pool.ballsArray[i].vy.toFixed(1)!=0) {
				flag=true;
				break;
			}
			
		}
		if(!flag) {

			for(i=0;i<pool.ballsArray.length;i++) {
				pool.ballsArray[i].vx=0;
				pool.ballsArray[i].vy=0;
			}

			this.displayFouledMessage();
			this.clearPottedBalls();

			if(((pool.player1.playerColor=='#f03c3c')&&(pool.redBalls.length==0))||((pool.player1.playerColor=='#e6e616')&&(pool.yellowBalls.length==0)))
				pool.player1.playerColor='#111111';
			if(((pool.player2.playerColor=='#f03c3c')&&(pool.redBalls.length==0))||((pool.player2.playerColor=='#e6e616')&&(pool.yellowBalls.length==0)))
				pool.player2.playerColor='#111111';

			pool.whiteBall.flag=0;
			canvas.addEventListener('mousemove',listener);

			if(pool.player1.game) {
				canvasText.style.display='inline';
				canvasText.innerHTML='Player 1 wins';
				window.cancelAnimationFrame(that.animationId);

				canvas.style.cursor='pointer';
			}
			else if(pool.player2.game) {
				canvasText.style.display='inline';
				canvasText.innerHTML='Player 2 wins';
				window.cancelAnimationFrame(that.animationId);
				canvas.style.cursor='pointer';
			}
		}
		
	}

	this.clearPottedBalls=function() {
		for(i=0;i<pool.ballsArray.length;i++) {
			if(pool.ballsArray[i].statusFlag=='potted') {
				if(pool.ballsArray[i].color=='#f03c3c') {
					pool.ballsArray.splice(i,1);
					pool.redBalls.splice(i-2,1);
				}
				else if(pool.ballsArray[i].color=='#e6e616') {
					pool.ballsArray.splice(i,1);
					pool.yellowBalls.splice(i-pool.redBalls.length-2,1);
				}
				else if(pool.ballsArray[i].color==pool.blackBall.color) {
					pool.ballsArray.splice(i,1);
				}
				else{
					var minX=195,minY=200,maxX=295,maxY=400;
					var randomX,randomY;
					var isAnyBallInWhitePosition=false;
					do {
						randomX=Math.floor(Math.random()*(maxX-minX+1)+minX);
						randomY=Math.floor(Math.random()*(maxY-minY+1)+minY);
						for(i=1;i<pool.ballsArray.length;i++) {
							var distSqr=(randomX-pool.ballsArray[i].x)*(randomX-pool.ballsArray[i].x)+(randomY-pool.ballsArray[i].y)*(randomY-pool.ballsArray[i].y)
							//if(((randomX-pool.ballsArray[i].x)*(randomX-pool.ballsArray[i].x)+(randomY-pool.ballsArray[i].y)*(randomY-pool.ballsArray[i].y))>(pool.ballsArray[i].radius*pool.ballsArray[i].radius)) {
							if(distSqr<=(2*pool.ballsArray[i].radius)*(2*pool.ballsArray[i].radius)) {
								isAnyBallInWhitePosition=true;
								break;
							}
						}
					} while((((randomX-295)*(randomX-295)+(randomY-300)*(randomY-300))>10000)&&(!isAnyBallInWhitePosition));
					pool.whiteBall.x=randomX;pool.whiteBall.y=randomY;
					pool.ballsArray[0].statusFlag='inTable';
					pool.ballsArray[0].crossed=false;
				}
			}
		}
	}

	this.checkIfNear=function() {
		for(i=0;i<pool.ballsArray.length;i++) {
			for(j=i;j<pool.ballsArray.length;j++) {
				if (pool.ballsArray[i].x + pool.ballsArray[i].radius + pool.ballsArray[j].radius > pool.ballsArray[j].x 
					&& pool.ballsArray[i].x < pool.ballsArray[j].x + pool.ballsArray[i].radius + pool.ballsArray[j].radius
					&& pool.ballsArray[i].y + pool.ballsArray[i].radius + pool.ballsArray[j].radius > pool.ballsArray[j].y 
					&& pool.ballsArray[i].y < pool.ballsArray[j].y + pool.ballsArray[i].radius + pool.ballsArray[j].radius){
					    return true;
				}
			}
		}
	}


	this.checkIfPotted=function() {
			for(i=0;i<pool.ballsArray.length;i++) {
				if(((pool.ballsArray[i].x-(boundLeft-35))*(pool.ballsArray[i].x-(boundLeft-35))+(pool.ballsArray[i].y-(boundTop-35))*(pool.ballsArray[i].y-(boundTop-35))-75*75)<0) {
					if(pool.ballsArray[i].statusFlag=='inTable') {
						pool.ballsArray[i].statusFlag='potted';
						pool.ballsArray[i].vy=0;pool.ballsArray[i].vx=0;
						pool.ballsArray[i].x=25;pool.ballsArray[i].y=30;
						pocketAudio.play();
						this.verifyFoul(i);	
					}			
				}
				else if(((pool.ballsArray[i].x-(boundRight+35))*(pool.ballsArray[i].x-(boundRight+35))+(pool.ballsArray[i].y-(boundTop-35))*(pool.ballsArray[i].y-(boundTop-35))-75*75)<0) {
					if(pool.ballsArray[i].statusFlag=='inTable') {
						pool.ballsArray[i].statusFlag='potted';
						pool.ballsArray[i].vy=0;pool.ballsArray[i].vx=0;
						pool.ballsArray[i].x=1115;pool.ballsArray[i].y=30;
						pocketAudio.play();
						this.verifyFoul(i);
					}
				}
				else if(((pool.ballsArray[i].x-(boundLeft-35))*(pool.ballsArray[i].x-(boundLeft-35))+(pool.ballsArray[i].y-(boundBottom+35))*(pool.ballsArray[i].y-(boundBottom+35))-75*75)<0) {
					if(pool.ballsArray[i].statusFlag=='inTable') {
						pool.ballsArray[i].statusFlag='potted';
						pool.ballsArray[i].vy=0;pool.ballsArray[i].vx=0;
						pool.ballsArray[i].x=25;pool.ballsArray[i].y=570;
						pocketAudio.play();
						this.verifyFoul(i);
					}
				}
				else if(((pool.ballsArray[i].x-(boundRight+35))*(pool.ballsArray[i].x-(boundRight+35))+(pool.ballsArray[i].y-(boundBottom+35))*(pool.ballsArray[i].y-(boundBottom+35))-75*75)<0) {
					if(pool.ballsArray[i].statusFlag=='inTable') {
						pool.ballsArray[i].statusFlag='potted';
						pool.ballsArray[i].vy=0;pool.ballsArray[i].vx=0;
						pool.ballsArray[i].x=1115;pool.ballsArray[i].y=570;
						pocketAudio.play();
						this.verifyFoul(i);
					}
				}
				else if(((pool.ballsArray[i].x-canvas.width/2)*(pool.ballsArray[i].x-canvas.width/2)+(pool.ballsArray[i].y-(boundTop-195))*(pool.ballsArray[i].y-(boundTop-195))-200*200)<0) {
					if(pool.ballsArray[i].statusFlag=='inTable') {
						pool.ballsArray[i].statusFlag='potted';
						pool.ballsArray[i].vy=0;pool.ballsArray[i].vx=0;
						pool.ballsArray[i].x=canvas.width/2;pool.ballsArray[i].y=15;
						pocketAudio.play();
						this.verifyFoul(i);
					}
				}
				else if(((pool.ballsArray[i].x-canvas.width/2)*(pool.ballsArray[i].x-canvas.width/2)+(pool.ballsArray[i].y-(boundBottom+195))*(pool.ballsArray[i].y-(boundBottom+195))-200*200)<0) {
					if(pool.ballsArray[i].statusFlag=='inTable') {
						pool.ballsArray[i].statusFlag='potted';
						pool.ballsArray[i].vy=0;pool.ballsArray[i].vx=0;
						pool.ballsArray[i].x=canvas.width/2;pool.ballsArray[i].y=590;
						pocketAudio.play();
						this.verifyFoul(i);
					}
				}
			}
	}

	this.verifyFoul=function(i) {

		if(pool.player1.turn) {
			if(i==0) pool.player1.fouled=true;
			else if(i==1) {
				if(((pool.player1.playerColor=='#f03c3c')&&(pool.redBalls.length==0))||((pool.player1.playerColor=='#e6e616')&&(pool.yellowBalls.length==0)))
					pool.player1.game=true;
				else if(pool.player1.playerColor=='#111111') pool.player1.game=true;
				else pool.player2.game=true;
			}
			else {
				if(!colorSet) {
					pool.player1.playerColor=pool.ballsArray[i].color;
					if(pool.player1.playerColor=='#f03c3c') pool.player2.playerColor='#e6e616';
					else pool.player2.playerColor='#f03c3c';
					colorSet=true;
				}
				else {
					if(pool.player1.playerColor!=pool.ballsArray[i].color) pool.player1.fouled=true;
				}
			}
		}

		else if(pool.player2.turn) {
			if(i==0) pool.player2.fouled=true;
			else if(i==1) {
				if(((pool.player2.playerColor=='#f03c3c')&&(pool.redBalls.length==0))||((pool.player2.playerColor=='#e6e616')&&(pool.yellowBalls.length==0)))
					pool.player2.game=true;
				else if(pool.player1.playerColor=='#111111') pool.player2.game=true;
				else pool.player1.game=true;
			}
			else {
				if(!colorSet) {
					pool.player2.playerColor=pool.ballsArray[i].color;
					if(pool.player2.playerColor=='#f03c3c') pool.player1.playerColor='#e6e616';
					else pool.player1.playerColor='#f03c3c';
					colorSet=true;
				}
				else {
					if(pool.player2.playerColor!=pool.ballsArray[i].color) pool.player2.fouled=true;
				}
			}
		}
	}

	this.checkBoundaries=function() {
		for(var i=0;i<pool.ballsArray.length;i++) {

			//bottom
			if (pool.ballsArray[i].y >  (boundBottom- pool.ballsArray[i].radius)) {
				var bool1=(pool.ballsArray[i].x>(boundLeft+40-pool.ballsArray[i].radius))&&(pool.ballsArray[i].x<(canvas.width/2-30));
				var bool2=(pool.ballsArray[i].x>=(canvas.width/2+30))&&(pool.ballsArray[i].x<(boundRight-40+pool.ballsArray[i].radius));
				if((bool1||bool2)&&(!pool.ballsArray[i].crossed)) {
					wallsAudio.volume=Math.sqrt(pool.ballsArray[i].vx*pool.ballsArray[i].vx+pool.ballsArray[i].vy*pool.ballsArray[i].vy)*2.5/100;
					wallsAudio.play();
					pool.ballsArray[i].vy *= -1;
					while(pool.ballsArray[i].y >  (boundBottom- pool.ballsArray[i].radius)) {
						pool.ballsArray[i].x+=pool.ballsArray[i].vx;
						pool.ballsArray[i].y+=pool.ballsArray[i].vy;
					}
				}
				else {
					pool.ballsArray[i].crossed=true;
					var boolx=(pool.ballsArray[i].x<=(canvas.width/2-30));
					var booly=(pool.ballsArray[i].x>=(canvas.width/2+30));
					if(boolx||booly) pool.ballsArray[i].vx*=-1;
				}
			}

			// top
			if (pool.ballsArray[i].y <  (boundTop+pool.ballsArray[i].radius)) {
				var bool1=(pool.ballsArray[i].x>(boundLeft+40-pool.ballsArray[i].radius))&&(pool.ballsArray[i].x<(canvas.width/2-30));
				var bool2=(pool.ballsArray[i].x>=(canvas.width/2+30))&&(pool.ballsArray[i].x<(boundRight-40+pool.ballsArray[i].radius));
				if((bool1||bool2)&&(!pool.ballsArray[i].crossed)) {
					wallsAudio.volume=Math.sqrt(pool.ballsArray[i].vx*pool.ballsArray[i].vx+pool.ballsArray[i].vy*pool.ballsArray[i].vy)*2.5/100;
					wallsAudio.play();
					pool.ballsArray[i].vy *= -1;
					while(pool.ballsArray[i].y <  (boundTop+pool.ballsArray[i].radius)) {
						pool.ballsArray[i].x+=pool.ballsArray[i].vx;
						pool.ballsArray[i].y+=pool.ballsArray[i].vy;
					}
				}
				else {
					pool.ballsArray[i].crossed=true;
					var boolx=(pool.ballsArray[i].x<=(canvas.width/2-30));
					var booly=(pool.ballsArray[i].x>=(canvas.width/2+30));
					if(boolx||booly) pool.ballsArray[i].vx*=-1;
				}
			}
			
			// right
			if (pool.ballsArray[i].x > (boundRight- pool.ballsArray[i].radius)) {
				var bool=(pool.ballsArray[i].y>(boundTop+40))&&(pool.ballsArray[i].y<(boundBottom-40));
				if(bool) {
					wallsAudio.volume=Math.sqrt(pool.ballsArray[i].vx*pool.ballsArray[i].vx+pool.ballsArray[i].vy*pool.ballsArray[i].vy)*2.5/100;
					wallsAudio.play();
					pool.ballsArray[i].vx *= -1;
					while(pool.ballsArray[i].x > (boundRight- pool.ballsArray[i].radius)) {
						pool.ballsArray[i].x+=pool.ballsArray[i].vx;
						pool.ballsArray[i].y+=pool.ballsArray[i].vy;
					}
				}
			}
			
			// left
			if (pool.ballsArray[i].x < (boundLeft+pool.ballsArray[i].radius)) {
				var bool=(pool.ballsArray[i].y>(boundTop+40))&&(pool.ballsArray[i].y<(boundBottom-40));
				if(bool) {
					wallsAudio.volume=Math.sqrt(pool.ballsArray[i].vx*pool.ballsArray[i].vx+pool.ballsArray[i].vy*pool.ballsArray[i].vy)*2.5/100;
					wallsAudio.play();
					pool.ballsArray[i].vx *= -1;
					while(pool.ballsArray[i].x < (boundLeft+pool.ballsArray[i].radius)) {
						pool.ballsArray[i].x+=pool.ballsArray[i].vx;
						pool.ballsArray[i].y+=pool.ballsArray[i].vy;
					}
				}
			}
		}
	}

	this.checkCollisions=function() {
		for(i=0;i<pool.ballsArray.length;i++) {

			for(j=i;j<pool.ballsArray.length;j++){

				if((j != i)&&(pool.ballsArray[i].statusFlag=='inTable'&&pool.ballsArray[j].statusFlag=='inTable')) {

					distSquared=Math.pow((pool.ballsArray[j].x - pool.ballsArray[i].x),2) + Math.pow((pool.ballsArray[j].y - pool.ballsArray[i].y),2);

					if(distSquared <= (pool.ballsArray[i].radius + pool.ballsArray[j].radius) * (pool.ballsArray[i].radius + pool.ballsArray[j].radius)){

						var v1square=pool.ballsArray[i].vx*pool.ballsArray[i].vx+pool.ballsArray[i].vy*pool.ballsArray[i].vy;
						var v2square=pool.ballsArray[j].vx*pool.ballsArray[j].vx+pool.ballsArray[j].vy*pool.ballsArray[j].vy;
						var avg=(v1square+v2square)/2;

						ballsAudio.volume=Math.sqrt(avg)/100*5;

						ballsAudio.play();

						collisionOccured=true;

						if(!initialFoulChecked) {

							if(pool.player1.turn&&i==0) {
								if((pool.player1.playerColor!=pool.ballsArray[j].color)&&colorSet) pool.player1.fouled=true;
							}
							else if(pool.player2.turn&&i==0) {
								if((pool.player2.playerColor!=pool.ballsArray[j].color)&&colorSet) pool.player2.fouled=true;
							}
							initialFoulChecked=true;
						}

						dx = pool.ballsArray[i].x - pool.ballsArray[j].x;
						dy = pool.ballsArray[i].y - pool.ballsArray[j].y;

						phi = Math.atan2(dy, dx);

						mag1 = Math.sqrt(pool.ballsArray[i].vx * pool.ballsArray[i].vx + pool.ballsArray[i].vy * pool.ballsArray[i].vy);
						mag2 = Math.sqrt(pool.ballsArray[j].vx * pool.ballsArray[j].vx + pool.ballsArray[j].vy * pool.ballsArray[j].vy);

						dir1 = Math.atan2(pool.ballsArray[i].vy, pool.ballsArray[i].vx);
						dir2 = Math.atan2(pool.ballsArray[j].vy, pool.ballsArray[j].vx);

						xspeed1 = mag1 * Math.cos(dir1 - phi);
						yspeed1 = mag1 * Math.sin(dir1 - phi);

						xspeed2 = mag2 * Math.cos(dir2 - phi);
						yspeed2 = mag2 * Math.sin(dir2 - phi);

						//finalXspeed1 = ((pool.ballsArray[i].mass - pool.ballsArray[j].mass) * xspeed1 + (pool.ballsArray[j].mass + pool.ballsArray[j].mass) * xspeed2) / (pool.ballsArray[i].mass + pool.ballsArray[j].mass);
						//finalXspeed2 = ((pool.ballsArray[i].mass + pool.ballsArray[i].mass) * xspeed1 + (pool.ballsArray[j].mass - pool.ballsArray[i].mass) * xspeed2) / (pool.ballsArray[i].mass + pool.ballsArray[j].mass);

						finalXspeed1=xspeed2;
						finalXspeed2=xspeed1;

						finalYspeed1 = yspeed1;
						finalYspeed2 = yspeed2;

						tempvxi = Math.cos(phi) * finalXspeed1 + Math.cos(phi + Math.PI / 2) * finalYspeed1;
						tempvyi = Math.sin(phi) * finalXspeed1 + Math.sin(phi + Math.PI / 2) * finalYspeed1;
						tempvxj = Math.cos(phi) * finalXspeed2 + Math.cos(phi + Math.PI / 2) * finalYspeed2;
						tempvyj = Math.sin(phi) * finalXspeed2 + Math.sin(phi + Math.PI / 2) * finalYspeed2;

						pool.ballsArray[i].vx = tempvxi;
						pool.ballsArray[i].vy = tempvyi;
						pool.ballsArray[j].vx = tempvxj;
						pool.ballsArray[j].vy = tempvyj;						

						 while(Math.sqrt(distSquared) <= (pool.ballsArray[i].radius + pool.ballsArray[j].radius)) {
							pool.ballsArray[i].x+=pool.ballsArray[i].vx;
							pool.ballsArray[i].y+=pool.ballsArray[i].vy;
							pool.ballsArray[j].x+=pool.ballsArray[j].vx;
							pool.ballsArray[j].y+=pool.ballsArray[j].vy;
							distSquared=Math.pow((pool.ballsArray[j].x - pool.ballsArray[i].x),2) + Math.pow((pool.ballsArray[j].y - pool.ballsArray[i].y),2);
						}
					}
				}
			}
		}
	}
}	