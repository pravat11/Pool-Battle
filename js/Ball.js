function Ball(){
	this.radius=15;
	this.x=0;
	this.y=0;
	this.vx=0;
	this.vy=0;
	this.flag=0;
	this.statusFlag='inTable';
	this.color;
	this.mass=10;
	this.crossed=false;

	this.getRedBall=function() {
		this.color='#f03c3c';
		return this;
	}
	this.getYellowBall=function() {
		this.color='#e6e616';
		return this;
	}
	this.getBlackBall=function() {
		this.color='#111111';
		return this;
	}
	this.getWhiteBall=function() {
		this.color='#efefef';
		return this;
	}

}
