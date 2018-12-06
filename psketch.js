

///////////////////////////////
//////////LEVEL STUFF//////////
///////////////////////////////

var CurrentLevel = 0;

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

//position C
var TCX;
var TCy;

//speed C
var Tsy;

/////////SERIAL CONTROL/////////

var serial;
var portName = '/dev/cu.usbmodem14201';
var inData;
var switch1;
var switch2;
var switch3;
var switch4;
var switch5;
var switch6;
var switch7;
var switch8;
var switch9;



//sliders
var slidernumber;
var sliderSize = 30;
var sliderY;
var sliderSpacing;





function setup() {
  createCanvas(window.innerHeight*4/3, window.innerHeight);
  background(255);
  ellipseMode(RADIUS);
  strokeWeight(0);
  // textAlign(CENTER, CENTER);


  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
 
 serial.list();
 serial.open(portName);










}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function draw() {
  background("black");
  var trigger;
  // switch3 = trigger;


  // console.log(gyroCurrent[0],gyroCurrent[1],gyroCurrent[2],gyroCurrent[3],gyroCurrent[4],gyroCurrent[5],gyroCurrent[6],gyroCurrent[7],gyroCurrent[8]);

  // for(var i = 0;i<9;i++){
  //   // sliderY = map(gyroCurrent[i],-4,4,0+width/18,height-width/18,true);
  //   sliderY = map(gyroCurrent[i], theMin[i], theMAX[i]  ,0+width/18,height-width/18);

  //   sliderSpacing = (i*width/9) + (width/18);
  //   strokeWeight(sliderSize*2);
  //   stroke(50);


  //   line(sliderSpacing, 0+width/18, sliderSpacing, height-width/(2*9));
  //   strokeWeight(0);

  //   ellipse(sliderSpacing,sliderY,sliderSize);

  // }


var mapx = map(switch2,-10,10,width,0,true);
var mapy = map(switch1,-10,10,height,0,true);


// ellipse(mapx,mapy,22);



console.log(switch1,switch2,switch3);
// console.log(mapx, mapy);


if (mouseIsPressed){

  trigger = 1;
}


if(CurrentLevel == 0){                      //Home screen
  if(trigger == 1){
    CurrentLevel = CurrentLevel+1;
  }
  fill("green");
  textAlign(CENTER);
  textSize(100);
  text("CLICK TO START",width/2,height/2);
} else if(CurrentLevel == 1){                 //Level 1

  TargetA();



} else if(CurrentLevel == 2){

  TargetB();



} else if(CurrentLevel == 3){

  TargetC();



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





///////////////////////////////////
//////////Level Functions//////////
///////////////////////////////////




function TargetA(){

  time = millis()/2000;
  TAx = map(cos(time), -1,1,RA,width-RA);
  TAy = map(sin(time), -1,1,RA,height-RA);

  ellipse(TAx, TAy, RA);
  fill("white");
  if (dist(mouseX, mouseY, TAx,TAy) <=RA){
    fill("red");
  } 
   if(dist(mouseX, mouseY, TAx,TAy) <= RA && mouseIsPressed){
    fill("green");
  }
}

function TargetB(){
  TBx += Bsx;
  TBy += Bsy;

  if(TBx <=0 || TBx >= width){
    Bsx *= -1;
  }
  if(TBy <=0+RA || TBy >= height){
    Bsy *= -1;
  }

  fill("white");
  if (dist(mouseX, mouseY, TBx,TBy) <=RA){
    fill("red");
  } 
   if(dist(mouseX, mouseY, TBx,TBy) <= RA && mouseIsPressed){
    fill("green");
  }
  ellipse(TBx,TBy,RA);
}

function TargetC(){

  time = millis()/1000;

  TCx = map(sin(time), -1,1,RA,width-RA);
  TCy += Tsy;


  if (TCy <= 0+RA || TCy >= height-RA){
    Tsy *= -1;
  }

  fill("white");
  if (dist(mouseX, mouseY, TCx,TCy) <=RA){
    fill("red");
  } 
   if(dist(mouseX, mouseY, TCx,TCy) <= RA && mouseIsPressed){
    fill("green");
  }

  ellipse(TCx,TCy,RA);
}

function TargetD(){
  time = millis()/1000;

  TCx = map(sin(time), -1,1,RA,height-RA);
  TCy += Tsy;


  if (TCy <= 0+RA || TCy >= width-RA){
    Tsy *= -1;
  }

  fill("white");
  if (dist(mouseX, mouseY, TCy,TCx) <=RA){
    fill("red");
  } 
   if(dist(mouseX, mouseY, TCy,TCx) <= RA && mouseIsPressed){
    fill("green");
  }

  ellipse(TCy,TCx,RA);

}





































