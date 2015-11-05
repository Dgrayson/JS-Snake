var c; 
var ctx; 

var x = 0; 
var y = 0; 

function init(){
	c = document.getElementById("myCanvas"); 
	ctx = c.getContext("2d"); 
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

	ctx.beginPath();
	ctx.rect(x,y,10,5); 
	ctx.closePath(); 
	ctx.fillStyle = "white"; 
	ctx.fill(); 
	console.log("X = " + x); 
	console.log("Y = " + y); 
}

function getKeyDown(e){

	switch(e.keyCode){
		// up arrow
		case 38: 
			if(y > 0)
				y = y - 5; 
			break; 
		// Down arrow
		case 40:
			if(y < 145)
				y = y + 5; 
			break; 
		// left arrow
		case 37: 
			if(x > 0)
				x = x - 5; 
			break; 
		// right arrow
		case 39: 
			if(x < 290)
				x = x + 5; 
			break; 
	}
}

window.addEventListener('keydown',getKeyDown,true);