var canvas;
var ctx;
var numberOfBalls=7;
var poolTableImage;
var friction=0.992;
var animate;
var p1,p2;
var listener;
var boundLeft=28,boundRight=1108,boundTop=37,boundBottom=569;
var powerMeterContainer;
var powerMeter;
var p1Indicator,p2Indicator;
var pool;
var breakAudio;
var pocketAudio;
var ballsAudio;
var wallsAudio;


function Pool(){
	this.redBalls=[];
	this.yellowBalls=[];
	this.blackBall;
	this.whiteBall;
	this.ballsArray=[];
	this.cue;
	this.player1;
	this.player2;
	
	this.init=function() {
		canvas=document.getElementById('myCanvas');
		ctx=canvas.getContext('2d');	

		breakAudio = new Audio("sounds/break.wav");
		pocketAudio = new Audio("sounds/pocket.wav");
		ballsAudio = new Audio("sounds/balls.wav");
		wallsAudio = new Audio("sounds/wall.wav");

		for(var i=0;i<numberOfBalls;i++) {
			this.redBalls[i]=new Ball().getRedBall();
		}

		for(var i=0;i<numberOfBalls;i++) {
			this.yellowBalls[i]=new Ball().getYellowBall();
		}

		this.whiteBall=new Ball().getWhiteBall();

		this.blackBall=new Ball().getBlackBall();


		this.ballsArray.push(this.whiteBall);
		this.ballsArray.push(this.blackBall);

		for(var i=0;i<this.redBalls.length;i++)
			this.ballsArray.push(this.redBalls[i]);

		for(var i=0;i<this.yellowBalls.length;i++)
			this.ballsArray.push(this.yellowBalls[i]);

		this.redBalls[0].x=820;this.redBalls[0].y=305;

		this.yellowBalls[0].x=this.redBalls[0].x+2*this.redBalls[0].radius;this.yellowBalls[0].y=this.redBalls[0].y-this.redBalls[0].radius-1;
		this.yellowBalls[1].x=this.redBalls[0].x+2*this.redBalls[0].radius;this.yellowBalls[1].y=this.redBalls[0].y+this.redBalls[0].radius+1;

		this.redBalls[1].x=this.redBalls[0].x+4*this.redBalls[0].radius;this.redBalls[1].y=this.redBalls[0].y-2*this.redBalls[0].radius-1;
		this.blackBall.x=this.redBalls[0].x+4*this.redBalls[0].radius;this.blackBall.y=this.redBalls[0].y;
		this.redBalls[2].x=this.redBalls[0].x+4*this.redBalls[0].radius;this.redBalls[2].y=this.redBalls[0].y+2*this.redBalls[0].radius+1;

		this.yellowBalls[2].x=this.redBalls[0].x+6*this.redBalls[0].radius;this.yellowBalls[2].y=this.redBalls[0].y-3*this.redBalls[0].radius-3;
		this.redBalls[3].x=this.redBalls[0].x+6*this.redBalls[0].radius;this.redBalls[3].y=this.redBalls[0].y-this.redBalls[0].radius-1;
		this.yellowBalls[3].x=this.redBalls[0].x+6*this.redBalls[0].radius;this.yellowBalls[3].y=this.redBalls[0].y+this.redBalls[0].radius+1;
		this.yellowBalls[4].x=this.redBalls[0].x+6*this.redBalls[0].radius;this.yellowBalls[4].y=this.redBalls[0].y+3*this.redBalls[0].radius+3;

		this.redBalls[4].x=this.redBalls[0].x+8*this.redBalls[0].radius;this.redBalls[4].y=this.redBalls[0].y-4*this.redBalls[0].radius-4;
		this.yellowBalls[5].x=this.redBalls[0].x+8*this.redBalls[0].radius;this.yellowBalls[5].y=this.redBalls[0].y-2*this.redBalls[0].radius-2;
		this.redBalls[5].x=this.redBalls[0].x+8*this.redBalls[0].radius;this.redBalls[5].y=this.redBalls[0].y;
		this.yellowBalls[6].x=this.redBalls[0].x+8*this.redBalls[0].radius;this.yellowBalls[6].y=this.redBalls[0].y+2*this.redBalls[0].radius+2;
		this.redBalls[6].x=this.redBalls[0].x+8*this.redBalls[0].radius;this.redBalls[6].y=this.redBalls[0].y+4*this.redBalls[0].radius+4;

		this.whiteBall.x=295;this.whiteBall.y=300;

		this.cue=new CueStick();	
		this.player1=new Player();
		this.player2=new Player();
		this.player1.turn=true;
		this.player2.turn=false;

		p1Indicator=document.getElementById('player1Indicator');
		p2Indicator=document.getElementById('player2Indicator');

		p1=document.getElementById('p1');
		p2=document.getElementById('p2');
	}

	this.addPowerAdjustListeners=function() {
		powerMeterContainer=document.getElementsByClassName('shot-power')[0];
		powerMeter=document.getElementById('power-meter');
		powerMeterContainer.addEventListener('mousedown',function(evt){
			powerMeterContainer.addEventListener('mousemove',powerAdjuster); 
		});
		powerMeterContainer.addEventListener('mouseup',function(evt){
			powerMeterContainer.removeEventListener('mousemove',powerAdjuster); 
		});
		var powerAdjuster=function(evt) {
			var rect = powerMeterContainer.getBoundingClientRect(); 
			var y=(evt.clientY - rect.top);
			var heightPercent=Math.round(((rect.height-y)/rect.height)*100);
			powerMeter.style.height=5*Math.round(heightPercent/5)+'%';	
		}
	}
}

function loader(){
	pool=new Pool();
	pool.init();
	pool.addPowerAdjustListeners();
	animate=new Animate();
	animate.init();
	var pos;

	document.getElementById('close-rules').addEventListener('click',function(){
		document.getElementsByClassName('pool-rules')[0].style.display='none';
	});

	document.getElementById('rules-button').addEventListener('click',function(){
		if(window.getComputedStyle(document.getElementsByClassName('pool-rules')[0]).display=='none')
			document.getElementsByClassName('pool-rules')[0].style.display='block';
		else document.getElementsByClassName('pool-rules')[0].style.display='none';
	});

	listener=function(evt){
		pos=pool.cue.getMousePos(canvas,evt);
		pool.cue.draw(pos);	
	}

	// adjustCueBall=function(evt){
	// 	pos=pool.cue.getMousePos(canvas,evt);
	// 	if(((pos.x-pool.whiteBall.x)*(pos.x-pool.whiteBall.x)+(pos.y-pool.whiteBall.y)*(pos.y-pool.whiteBall.y)-15*15)<=0) {
	// 		canvas.style.cursor='pointer';
	// 		canvas.addEventListener('mousedown',dragCue);
	// 		dragCue=function() {
	// 			pool.whiteBall.x=pos.x;
	// 			pool.whiteBall.y=pos.y;
	// 		}
	// 		canvas.addEventListener('mouseup',function(){
	// 			removeEventListener('mousedown',dragCue);
	// 		});
	// 	}
	// 	else
	// 		canvas.style.cursor='none';
	// }

	canvas.addEventListener('mousemove',listener);

	canvas.addEventListener('mousedown',function(evt){
		pool.whiteBall.flag=1;
		canvas.removeEventListener('mousemove',listener);
		breakAudio.play();
	});
}

window.onload=loader();

	document.getElementById('new-game-button').addEventListener('click',function(){
		window.cancelAnimationFrame(animate.animationId);
		canvas.removeEventListener('mousemove',listener);
		pool=null;
		animate=null;
		loader();
	});
