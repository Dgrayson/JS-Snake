var c; 
var ctx; 

var s; 
var item; 

var itemSpawned = false; 

var score = 0; 

var timer = 50; 

var Player = function(){

	this.x = 0; 
	this.y = 0; 
	this.width = 5; 
	this.height = 5; 
	this.direction = "right"; 
	this.alive = true; 
	this.numSegments = 0; 
	this.segments = []; 

	this.drawPlayer = function(){

		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height); 
		ctx.closePath(); 
		ctx.fillStyle = "red"; 
		ctx.fill(); 

		if(this.numSegments > 0)
			this.drawSegments(); 
	}

	this.collisionCheck = function(i){
		if(this.x < i.x + i.width && this.x + this.width > i.x 
			&& this.y < i.y + i.width && this.y + this.height > i.y){
			itemSpawned = false; 
			score += 100; 
			this.addSegment(); 
		}
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
				this.y -= 5; 
				break; 
			case "down": 
				this.y += 5; 
				break; 

		}
	}

	this.addSegment = function(){

		var newSegment = new Segment(this.x - 5, this.y); 
		this.segments[this.numSegments] = newSegment; 
		this.numSegments++; 
	}

	this.drawSegments = function(){

		this.updateSegments(); 

		var i = 0; 

		while(i < this.numSegments){
			ctx.beginPath(); 
			ctx.rect(this.segments[i].x, this.segments[i].y, 5,5); 
			ctx.closePath(); 
			ctx.fillStyle = "red";
			ctx.fill(); 
			i++; 
		}
	}

	this.updateSegments = function(){
		var tempX, tempY; 
		var i = 0; 

		tempX = this.segments[i].x; 
		tempY = this.segments[i].y; 

		this.segments[i].x = this.x; 
		this.segments[i].y = this.y; 

		i++; 

		while(i < this.numSegments){
			i++; 
		}
	}
}

var Segment = function(x,y){
	this.x = x; 
	this.y = y; 
	this.width = 5; 
	this.height = 5; 
}

var Item = function(){
	this.x = 0; 
	this.y = 0; 
	this.width = 5;
	this.height = 5;

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

	timer -= 1; 

	if(timer == 0){
		s.movePlayer();
		timer = 50; 
	} 

	ctx.fillStyle = "black"; 

	ctx.beginPath(); 
	ctx.rect(0,0, 700,500); 
	ctx.closePath(); 

	ctx.fill(); 


	s.drawPlayer(); 


	checkItemAlive(); 

	s.collisionCheck(item); 

	//displayScore(); 

	/*console.log("X = " + s.x); 
	console.log("Y = " + s.y); */
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
				s.direction = "up";  
			break; 
		// Down arrow
		case 40:
			if(s.y < 145)
				s.direction = "down"; 
			break; 
		// left arrow
		case 37: 
			if(s.x > 0)
				s.direction = "left"; 
			break; 
		// right arrow
		case 39: 
			if(s.x < 290)
				s.direction = "right"; 
			break; 
	}
}

function displayScore(){
	ctx.font = "30px Arial"; 
	ctx.fillStyle = "white"; 
	ctx.fillText("Score: " + score, c.width/2, 0); 
}

window.addEventListener('keydown',getKeyDown,true);