var c; 
var ctx; 

var x = 0; 
var y = 0; 
var s; 

var Player = function(){
	this.playerX = 0; 
	this.playerY = 0; 
}

Player.prototype.drawPlayer = function(){

	ctx.beginPath();
	ctx.rect(this.playerX, this.playerY,10,5); 
	ctx.closePath(); 
	ctx.fillStyle = "white"; 
	ctx.fill(); 
}

function init(){
	c = document.getElementById("myCanvas"); 
	ctx = c.getContext("2d"); 
	s = new Player(); 
	return setInterval(draw, 10);
}

function clear(){
	ctx.clearRect(0,0,700, 500); 
}

function draw(){
	clear(); 

	ctx.fillStyle = "black"; 

	ctx.beginPath(); 
	ctx.rect(0,0, 700,500); 
	ctx.closePath(); 

	ctx.fill(); 


	s.drawPlayer(); 


	console.log("X = " + s.playerX); 
	console.log("Y = " + s.playerY); 
}

function getKeyDown(e){

	switch(e.keyCode){
		// up arrow
		case 38: 
			if(s.playerY > 0)
				s.playerY = s.playerY - 5; 
			break; 
		// Down arrow
		case 40:
			if(s.playerY < 145)
				s.playerY = s.playerY + 5; 
			break; 
		// left arrow
		case 37: 
			if(s.playerX > 0)
				s.playerX = s.playerX - 5; 
			break; 
		// right arrow
		case 39: 
			if(s.playerX < 290)
				s.playerX = s.playerX + 5; 
			break; 
	}
}

window.addEventListener('keydown',getKeyDown,true);