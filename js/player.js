function Player() {
	this.turn;
	this.color;
	this.fouled=false;
	this.game=false;

	this.setPlayerColor=function(color) {
		this.color=color;
	}
}