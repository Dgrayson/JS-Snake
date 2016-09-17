var c; 
var ctx; 

var s; 
var item; 

var itemSpawned = false; 
var score = 0; 
var highScore = 0; 
var timer = 10; 

var colors = ["red", "blue", "white", "yellow", "pink"]; 
var colorTracker = 0; 

// Main payer class
var Player = function(){

	this.x = 0; 
	this.y = 0; 
	this.width = 20; 
	this.height = 20; 
	this.direction = "right"; 
	this.alive = true; 
	this.numSegments = 0; 
	this.segments = []; 

	// Draws snake on canvas
	this.drawPlayer = function(){

		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height); 
		ctx.closePath(); 
		ctx.fillStyle = colors[colorTracker]; 
		ctx.fill(); 

		if(this.numSegments > 0)
			this.drawSegments(); 
	}

	// Check for various collisions
	this.collisionCheck = function(i){

		// check if snake head has collided with item
		if(this.x < i.x + i.width && this.x + this.width > i.x 
			&& this.y < i.y + i.height && this.y + this.height > i.y){
			itemSpawned = false; 
			score += 100; 
			this.addSegment(); 
		}

		// Check if snake has collided with tail
		var i = 0; 

		if(this.numSegments > 1){
			for(i = 1; i < this.numSegments; i++){
				if(this.x == this.segments[i].x && this.y == this.segments[i].y)
					restartGame(); 
			}
		}

		// Check out of bounds
		if(this.x < 0 || this.x > 700 || this.y < 0 || this.y > 500)
			restartGame(); 
	}

	// Move the snake head
	this.movePlayer = function(){
		switch(this.direction){

			case "right": 
				this.x += 15; 
				break; 
			case "left": 
				this.x -= 15; 
				break; 
			case "up": 
				this.y -= 15; 
				break; 
			case "down": 
				this.y += 15; 
				break; 

		}
	}


	// add a segment to the snake
	this.addSegment = function(){

		var newSegment 

		if(this.numSegments == 0)
			newSegment = new Segment(this.x - this.width -1, this.y);
		else
			newSegment = new Segment(this.segments[this.numSegments-1].x - this.width -1, this.segments[this.numSegments-1].y); 

		this.segments.push(newSegment); 
		this.numSegments++; 
	}

	// draw the snake segements
	this.drawSegments = function(){

		//this.updateSegments(); 

		var i = 0; 

		while(i < this.numSegments){
			ctx.beginPath(); 
			ctx.rect(this.segments[i].x, this.segments[i].y, this.segments[i].width, this.segments[i].height); 
			ctx.closePath(); 
			ctx.fillStyle = colors[colorTracker];
			ctx.fill(); 
			i++; 
		}
	}

	// update positioning of the snake segments
	this.updateSegments = function(){
		var i = 0;

		// Set the position of the curr segment to the one 
		// in front of it
		for(i = this.numSegments-1; i > 0; i--){
			this.segments[i].x = this.segments[i-1].x; 
			this.segments[i].y = this.segments[i-1].y
		}

		this.segments[0].x = this.x; 
		this.segments[0].y = this.y; 
	}
}

// Segment class
var Segment = function(x,y){
	this.x = x; 
	this.y = y; 
	this.width = 20; 
	this.height = 20; 
}

// Item class
var Item = function(){
	this.x = 0; 
	this.y = 0; 
	this.width = 20;
	this.height = 20;

	// change color of the item
	this.color = colors[colorTracker]; 

	if(colorTracker == 4)
		colorTracker = 0; 
	else
		colorTracker++

	// spawn an item
	this.spawnItem = function(){
		this.x = randomInt(0, 700); 
		this.y = randomInt(0, 500); 
	}

	// draw the item
	this.drawItem = function(){

		ctx.beginPath(); 
		ctx.rect(this.x, this.y, 20,20); 
		ctx.closePath(); 
		ctx.fillStyle = this.color;
		ctx.fill(); 
	}
}

// Select a random integer that is a multiple of 5
function randomInt(max, min){
	var running = true; 

	while(running){
		var temp = Math.floor(Math.random() * (max - min + 1)) + min;

		if(temp % 15 == 0)
			running = false; 
		
	}

	return temp; 
}

function init(){

	// Initailize game and canvas elements
	c = document.getElementById("myCanvas"); 
  c.width = 700; 
  c.height = 500; 
	ctx = c.getContext("2d"); 
	s = new Player(); 

	tempSeg = new Segment(s.x, s.y);

	// add snake head to the segment array
	s.segments[s.numSegments] = tempSeg; 
	s.numSegments++;  

	// run draw function every 10ms
	return setInterval(draw, 10);
}

function restartGame(){

	// restarts game reinitalized variables to default status
	s = new Player(); 
	tempSeg = new Segment(s.x, s.y);

	s.segments[s.numSegments] = tempSeg; 
	s.numSegments++; 

	itemSpawned = false;
  
  if(score > highScore)
    highScore = score; 
  
  score = 0; 
  colorTracker = 0;

}

// clear canvas
function clear(){
	ctx.clearRect(0,0,700, 500); 
}

function draw(){

	// main game loop handles all game logic

	// refresh the canvas
	clear(); 

	// tick timer down one count
	timer -= 1; 

	// if timer equals zero move the snake head and segments
	if(timer == 0){
		s.movePlayer();
		if(s.numSegments > 0)
					s.updateSegments(); 
		timer = 10; 
	} 

	ctx.fillStyle = "black"; 

	// repaint canvas
	ctx.beginPath(); 
	ctx.rect(0,0, 700,500); 
	ctx.closePath(); 

	ctx.fill(); 

	s.drawPlayer(); 

	checkItemAlive(); 

	s.collisionCheck(item); 
  
  displayScore(); 
}

// Check if there is an item on screen
function checkItemAlive(){

	// if there is no item create one
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

// handles keyboard input
function getKeyDown(e){

	switch(e.keyCode){
		// up arrow
		case 38: 
			if(s.direction != "down")
				s.direction = "up";  
			break; 
		// Down arrow
		case 40:
			if(s.direction != "up")
				s.direction = "down"; 
			break; 
		// left arrow
		case 37: 
			if(s.direction != "right")
				s.direction = "left"; 
			break; 
		// right arrow
		case 39: 
			if(s.direction != "left")
				s.direction = "right"; 
			break; 
	}
}

function displayScore(){
	ctx.font = "20px Arial"; 
	ctx.fillStyle = "white"; 
	ctx.fillText("Score: " + score, c.width/2 - 75, 30); 
  
  ctx.font = "20px Arial"; 
	ctx.fillStyle = "white"; 
	ctx.fillText("High Score: " + highScore, c.width - 200, 30); 
}

window.addEventListener('keydown',getKeyDown,true);
