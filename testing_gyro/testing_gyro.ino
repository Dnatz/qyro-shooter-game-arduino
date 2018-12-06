//Donato Liotino: Gyro
//Madelaine Fischer-Bernhut: Mouse

////////
#include <Mouse.h>

const int xAxis = A1;         //analog sensor for X axis
const int yAxis = A2;         // analog sensor for Y axis

int range = 12;               // output range of X or Y movement
int responseDelay = 2;       // response delay of the mouse, in ms
int threshold = range/4;      // resting threshold
int center = range/2;         // resting position value
int minima[] = {
  1023, 1023};                // actual analogRead minima for {x, y}
int maxima[] = {
  0,0};                       // actual analogRead maxima for {x, y}
int axis[] = {
  xAxis, yAxis};              // pin numbers for {x, y}
int mouseReading[2];          // final mouse readings for {x, y}

///////



int V1;
int V2;
int V3;
int V4;
int V5;
int V6;
int V7;
int V8;
int V9;

//
//float G1 = IMU.getAccelX_mss();
//float G2 = IMU.getAccelY_mss();
//float G3 = IMU.getAccelZ_mss();
//
//float G4 = IMU.getGyroX_rads();
//float G5 = IMU.getGyroY_rads();
//float G6 = IMU.getGyroY_rads();
//
//float G7 = IMU.getMagX_uT();
//float G8 = IMU.getMagY_uT();
//float G9 = IMU.getMagZ_uT();

float Gmap[] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0};

float Gmax[] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0};
float Gmin[] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0};

#include "MPU9250.h"

// an MPU9250 object with the MPU-9250 sensor on I2C bus 0 with address 0x68
MPU9250 IMU(Wire, 0x68);
int status;

void setup() {
/////
 Mouse.begin();
/////
  
  // serial to display data
  Serial.begin(115200);
  while (!Serial) {}

  // start communication with IMU
  status = IMU.begin();
  if (status < 0) {
    Serial.println("IMU initialization unsuccessful");
    Serial.println("Check IMU wiring or try cycling power");
    Serial.print("Status: ");
    Serial.println(status);
    while (1) {}
  }


}

void loop() {
////////
//int xMap = map(IMU.getAccelX_mss(),10,0,0, 1000);
//int yMap = map(IMU.getAccelY_mss(),10,0,0, 1000);

// read and scale the two axes:
//  int yReading = xMap;
//  int xReading = yMap;
int xReading = (IMU.getAccelY_mss())*-5;
int yReading = (IMU.getAccelX_mss())*-5;


// move the mouse:
    Mouse.move(xReading, yReading, 0);
    delay(responseDelay);
////////

  
  // read the sensor
  IMU.readSensor();
  float Gnums[] = {IMU.getAccelX_mss(), IMU.getAccelY_mss(), IMU.getAccelZ_mss(), IMU.getGyroX_rads(), IMU.getGyroY_rads(), IMU.getGyroY_rads(), IMU.getMagX_uT(), IMU.getMagY_uT(), IMU.getMagZ_uT()};


  // display the data

  //  Serial.print("Temperature in C: ");
  //  Serial.println(IMU.getTemperature_C(),6);
  //  Serial.println();

  //  Serial.print(IMU.getAccelX_mss(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getAccelY_mss(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getAccelZ_mss(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getGyroX_rads(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getGyroY_rads(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getGyroZ_rads(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getMagX_uT(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getMagY_uT(),9);
  //  Serial.print(",");
  //  Serial.print(IMU.getMagZ_uT(),9);
  //  Serial.println();


  for (int i = 0; i < 9; i++) {

    if (Gnums[i] > Gmax[i]) {
      Gmax[i] = Gnums[i];
    }
    if (Gnums[i] < Gmin[i]) {
      Gmin[i] = Gnums[i];
    }



  }












//  for (int i = 0; i < 2; i++) {
//    Serial.print(Gnums[i], 9);
//    Serial.print(",");
//
//  }

//Serial.print();
  Serial.println();

  delay(200);









}










//////////
int readAxis(int axisNumber) {
  int distance = 0;    // distance from center of the output range

  // read the analog input:
  int reading = analogRead(axis[axisNumber]);

// of the current reading exceeds the max or min for this axis,
// reset the max or min:
  if (reading < minima[axisNumber]) {
    minima[axisNumber] = reading;
  }
  if (reading > maxima[axisNumber]) {
    maxima[axisNumber] = reading;
  }

  // map the reading from the analog input range to the output range:
  reading = map(reading, minima[axisNumber], maxima[axisNumber], 0, range);

 // if the output reading is outside from the
 // rest position threshold,  use it:
  if (abs(reading - center) > threshold) {
    distance = (reading - center);
  }

  // the Y axis needs to be inverted in order to
  // map the movemment correctly:
  if (axisNumber == 1) {
    distance = -distance;
  }

  // return the distance for this axis:
  return distance;
}
////////////
