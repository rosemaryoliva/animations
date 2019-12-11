
var 
	canvas,
	width,
	height,
	ctx;

var bodies = [];
	
function init(){
	canvas = document.getElementById("canvas");
	width = 800;
	height = 600;
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	
	createBodies();
	
	setInterval(function(){
		updateSystem();
		updateBodies(0.005);
		ctx.clearRect(0,0,width,height);
		drawBodies();
	},1);
	
}

function createBodies(){
	bodies.push(new Body(100,300,250,Math.PI/2,100,5,true));
	bodies.push(new Body(100,210,250,Math.PI/2,10,1,true));
	
	
	bodies.push(new Body(150,300,250,Math.PI/2,100,5,true));
	bodies.push(new Body(300,150,300,0,10,3,true));
	bodies.push(new Body(350,150,300,0,10,3,true));
	
	bodies.push(new Body(400,300,0,0,10000000,15,false));//Sun
}

function drawBodies(){
	for(var i = 0;i < bodies.length;i++)
		bodies[i].draw(ctx);
}

function updateBodies(dt){
	for(var i = 0;i < bodies.length;i++)
		bodies[i].update(dt);
}

function updateSystem(){
	var G = 1;
	
	for(var i = 0;i < bodies.length;i++)
		for(var j = 0;j < bodies.length;j++){
			if(i == j) continue;
			var b1 = bodies[i];
			var b2 = bodies[j];
			
			var dist = Math.sqrt(
				(b1.x - b2.x)*(b1.x - b2.x) + 
				(b1.y - b2.y)*(b1.y - b2.y)
			);
			
			var force = G*(b1.m * b2.m)/dist/dist;
			
			var nx = (b2.x - b1.x)/dist;
			var ny = (b2.y - b1.y)/dist;
			
			b1.ax += nx * force / b1.m;
			b1.ay += ny * force / b1.m;
			
			b2.ax -= nx * force / b2.m;
			b2.ay -= ny * force / b2.m;
			
		}
}







function Body(x,y,v,angle,mass,radius,hasTail){
	this.x = x;
	this.y = y;
	this.vx = v * Math.cos(angle);
	this.vy = v * Math.sin(angle);
	this.m = mass;
	this.radius = radius;
	this.ax = 0;
	this.ay = 0;
	
	if(hasTail)
		this.tail = new Tail(70);
	this.tailCounter = 0;
	this.tailLimit = 3;
	
	
	this.update = function(dt){
		this.vx += this.ax * dt;
		this.vy += this.ay * dt;
		
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		
		this.ax = 0;
		this.ay = 0;
		
		if(this.tail){
			if(this.tailCounter > this.tailLimit){
				this.tailCounter -= this.tailLimit;
				this.tail.addPoint({x:this.x,y:this.y});
			}
			else
				this.tailCounter++;
		}
		
	};
	this.draw = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,6.28);
		ctx.stroke();
		
		if(this.tail)
			this.tail.draw(ctx);
	};
}

function Tail(maxLength){
	this.points = [];
	this.maxLength = maxLength;
	this.addPoint = function(point){
		
		for(var i = Math.min(maxLength,this.points.length);i > 0;i--)
			this.points[i] = this.points[i - 1];
		
		this.points[0] = point;
	};
	this.draw = function(ctx){
		for(var i = 1; i < Math.min(this.maxLength,this.points.length);i++){
			
			if(i < this.maxLength - 20)
				ctx.globalAlpha = 1;
			else
				ctx.globalAlpha = (this.maxLength - i)/20;
			
			ctx.beginPath();
			ctx.moveTo(this.points[i - 1].x,this.points[i - 1].y);
			ctx.lineTo(this.points[i].x,this.points[i].y);
			ctx.stroke();
		}
		ctx.globalAlpha = 1;
	};
}

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);



// //
