

var video;
var copy;
var copycanvas;
var draw;

var SOURCERECT = {x:0,y:0,w:0,h:0};
var PAINTRECT  = {x:0,y:0,w:1000,h:640};

function init(){
	video = document.getElementById('sourcevid');
	copycanvas = document.getElementById('sourcecopy');
	copy = copycanvas.getContext('2d');
	var outputcanvas = document.getElementById('output');
	draw = outputcanvas.getContext('2d');


	addEvent(outputcanvas,"mousemove", function(e){
		degree = 180 - (e.screenY/640)*180;
		
	}, false)	
		
	setInterval("processFrame()", 33);
	
}



var RAD = Math.PI/180;
var debug = true;
var degree = 180;

var animated = false;
var step = 10


function initAction(){
	jkj = new jikji();
	init()
}


function updateGeom(){
}


function updateCompleted(){}















function processFrame(){
	if(!isNaN(video.duration)){
		if(SOURCERECT.w == 0){
			SOURCERECT = {x:0,y:0,w:video.videoWidth,h:video.videoHeight};
		}
	}
	copy.drawImage(video, 0, 0);
	draw.clearRect(PAINTRECT.x, PAINTRECT.y, PAINTRECT.w, PAINTRECT.h);
	
	var centerx = PAINTRECT.w/2;
	var centery = PAINTRECT.h/2-50;
	var radius = SOURCERECT.w/2;
	
	if (animated) degree += step;
	degree %= 360;
	
	var angle = degree*RAD;
	var prepx = Math.cos(angle);
	var prepz = Math.sin(angle);
	
	draw.save();
	
	for(var i=0; i<SOURCERECT.w; i+=4){
		var dist = radius-i;
		var x = prepx*dist;
		var y = 0;
		var z = prepz*dist;
		var height = SOURCERECT.h+(z*0.5);
		
		draw.save();
		if(degree < 90 || degree > 270){
			draw.translate(PAINTRECT.w, 0);
			draw.scale(-1, 1);
			x *= -1;
		}
		var _x = Math.round(x+centerx);
		var _y = y+centery;
		draw.drawImage(copycanvas, i, 0, 4, SOURCERECT.h, _x, _y-(height/2), 4, height);
		
		draw.restore();
		
	}
	if(SOURCERECT.w != 0){
		draw.save();
		if(degree < 90 || degree > 270){
			draw.translate(PAINTRECT.w, 0);
			draw.scale(-1, 1);
			x *= -1;
		}

		draw.restore();
	}
}
