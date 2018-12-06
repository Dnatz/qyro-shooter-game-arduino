//Reference: BMOREN (Get started with color tracking)-https://gist.github.com/bmoren/3ff2cbc1f254092b82f12ab039fa5da2
//Reference: Colour Camera-https://trackingjs.com/examples/color_camera.html

//Tracking: Madelaine Fischer-Bernhut
//Counter/score/serial port setup: Donato Liotino

var time;
var Achange;
var RA = 60;

//position A
var TAx;
var TAy;

//position B
var TBx;
var TBy;

//speed B
var Bsx;
var Bsy;

//Tracking variables
var colors;
var trackingData;

function setup(){
  fill("black");
  createCanvas(windowWidth, windowHeight);
  noStroke();
  capture = createCapture(VIDEO); //capture webcam
  capture.position(0,0);
  capture.style('opacity', 0);
  capture.size(windowWidth, windowHeight);
  capture.id("myVideo"); //gives an ID similar to the one in tracker.js)

  ellipseMode(RADIUS);

  TBx = random(0 + RA,width - RA);
  TBy = random(0 + RA,height - RA);

  Bsx = random(3,8.0);
  Bsy = random(3,8.0);

  //Custom colour
  tracking.ColorTracker.registerColor('red', function(r, g, b) {
  if (r > 200 && g < 0 && b < 0) {
    return true;
  }
  return false;
});

  // colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow', 'red']);
  colors = new tracking.ColorTracker([ 'yellow']);

  tracking.track('#myVideo', colors); // start the tracking of the colors above on the camera in p5
}





var timekeeep = 0;
var TIMESIGNAL = 0;

var scoreBBB = 0;


function draw(){
  //Create fading out object trails using the alpha variable
  background(50);
  // image(capture, 0, 0, windowWidth, windowHeight);


ellipse(mouseX,mouseY,10);

  time = millis()/2000;
  TAx = map(cos(time), -1,1,RA,width-RA);
  TAy = map(sin(time), -1,1,RA,height-RA);
  var capture;



  // ellipse(TAx, TAy, RA);
  ellipse(TBx, TBy, RA);

  TBx += Bsx;
	TBy += Bsy;

	if(TBx <= 0 + RA || TBx >= width - RA){
		Bsx *= -1;
	}
	if(TBy <=0+RA || TBy >= height - RA){
		Bsy *= -1;
	}
  fill("white");
  textSize(100);
  textAlign(LEFT,TOP);
  text(scoreBBB,0,0);
  fill("black")

  colorVision();







}













function colorVision(){
   //detects the tracking
    colors.on('track', function(event) {
    trackingData = event.data
    });

  // console.log(trackingData);

    if(trackingData){ //If a colour is detected
      for (var i = 0; i < trackingData.length; i++) { //The tracked colours will be looped through
      console.log(trackingData[i].color);

      // noFill();
      // fill(trackingData[i].color);

      //Changes the colour of the shape created to match the tracked colour
      stroke(trackingData[i].color);

        if (trackingData[i].color === "yellow"){
          // ellipse(trackingData[i].x, trackingData[i].y, trackingData[i].width)
          // ellipse(windowWidth-trackingData[i].x, trackingData[i].y, 10);
        }

        // if (trackingData[i].color === "magenta"){
        //   // ellipse(trackingData[i].x, trackingData[i].y, trackingData[i].width)
        //   ellipse(windowWidth-trackingData[i].x, trackingData[i].y, 10);
        // }

        // TargetA(windowWidth-trackingData[i].x, trackingData[i].y);

        ellipse(mouseX,mouseY,10);

        TargetB(mouseX, mouseY, trackingData[i].color === "yellow");



      }
  }
}

function TargetA(x, y, colourDetect) {

    fill("0");
    if (dist(x, y, TAx,TAy) <= RA){
      fill("red");
    }
     if(dist(x, y, TAx,TAy) <= RA && colourDetect){
      fill("green");
    } else {
      noStroke();
      fill(0);
    }

}

function TargetB(x, y, colourDetect){


	fill("0");
	if (dist(x, y, TBx,TBy) <=RA){
		stroke("red");
	} else {
    noStroke();
    fill(0);
  }

  if(dist(x, y, TBx,TBy) <= RA && colourDetect){
     noStroke();
		fill("green");
    TBx = random(0 + RA,width - RA);
    TBy = random(0 + RA,height - RA);

    Bsx = random(-8, 8);
    Bsy = random(-8, 8);

scoreBBB += 1; 
TIMESIGNAL = 1;

	} else {
    noStroke();
    fill(0);
    TIMESIGNAL = 0;

  }

}






///////////////////////////////////
//////////SERIAL CONTROL///////////
///////////////////////////////////

 
 function serverConnected(){
  console.log('connected to server.');
}
function portOpen() {
  console.log('the serial port opened.')
}
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');
    if (sensors.length > 8) {
      switch1 = sensors[0];
      switch2 = sensors[1];
      switch3 = sensors[2];
      switch4 = sensors[3];
      switch5 = sensors[4];
      switch6 = sensors[5];
      switch7 = sensors[6];
      switch8 = sensors[7];
      switch9 = sensors[8];

    }
  }
}
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
function portClose() {
  console.log('The serial port closed.');
}
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}


