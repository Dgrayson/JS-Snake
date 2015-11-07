var c; 
var ctx; 

var s; 
var item; 

var itemSpawned = false; 

var Player = function(){
	this.playerX = 0; 
	this.playerY = 0; 
	this.direction = "right"; 
	this.alive = true; 
	this.segments = 1; 

	this.drawPlayer = function(){

	ctx.beginPath();
	ctx.rect(this.playerX, this.playerY,10,5); 
	ctx.closePath(); 
	ctx.fillStyle = "white"; 
	ctx.fill(); 
	}

	this.movePlayer = function(){
		switch(this.direction){

		case "right": 
			this.playerX += 5; 
			break; 
		case "left": 
			this.playerX -= 5; 
			break; 
		case "up": 
			this.playerY += 5; 
			break; 
		case "down": 
			this.playerY -= 5; 
			break; 

		}
	}
}


var Item = function(){
	this.itemX = 0; 
	this.itemY = 0; 

	this.spawnItem = function(){

	this.itemX = randomInt(0, 290); 
	this.itemY = randomInt(0, 145); 
	}

	this.drawItem = function(){

		ctx.beginPath(); 
		ctx.rect(this.itemX, this.itemY, 5,5); 
		ctx.closePath(); 
		ctx.fillStyle = "white";
		ctx.fill(); 
	}
}


function randomInt(max, min){
	var running = true; 

	while(running){
		var temp = Math.floor(Math.random() * (max - min + 1)) + min;

		if(temp % 5 == 0)
			running = false; 
		
	}

	return temp; 
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

	checkItemAlive(); 


	console.log("X = " + s.playerX); 
	console.log("Y = " + s.playerY); 
}

function checkItemAlive(){
	if(itemSpawned == false){

		item = new Item(); 
		item.spawnItem(); 
		item.drawItem(); 
		itemSpawned = true;  
	}
	else{
		item.drawItem(); 
		
	}
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