var c; 
var ctx; 

var s; 
var item; 

var itemSpawned = false; 

var Player = function(){
	this.x = 0; 
	this.y = 0; 
	this.direction = "right"; 
	this.alive = true; 
	this.segments = 1; 

	this.drawPlayer = function(){

	ctx.beginPath();
	ctx.rect(this.x, this.y,10,5); 
	ctx.closePath(); 
	ctx.fillStyle = "white"; 
	ctx.fill(); 
	}

	this.movePlayer = function(){
		switch(this.direction){

		case "right": 
			this.x += 5; 
			break; 
		case "left": 
			this.x -= 5; 
			break; 
		case "up": 
			this.y += 5; 
			break; 
		case "down": 
			this.y -= 5; 
			break; 

		}
	}
}

var Item = function(){
	this.x = 0; 
	this.y = 0; 

	this.spawnItem = function(){

	this.x = randomInt(0, 290); 
	this.y = randomInt(0, 145); 
	}

	this.drawItem = function(){

		ctx.beginPath(); 
		ctx.rect(this.x, this.y, 5,5); 
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


	console.log("X = " + s.x); 
	console.log("Y = " + s.y); 
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
			if(s.y > 0)
				s.y = s.y - 5; 
			break; 
		// Down arrow
		case 40:
			if(s.y < 145)
				s.y = s.y + 5; 
			break; 
		// left arrow
		case 37: 
			if(s.x > 0)
				s.x = s.x - 5; 
			break; 
		// right arrow
		case 39: 
			if(s.x < 290)
				s.x = s.x + 5; 
			break; 
	}
}

window.addEventListener('keydown',getKeyDown,true);