import { Accelerometer } from "accelerometer";
import { HeartRateSensor } from "heart-rate";

import * as fs from "fs";
let ascii_data = "";

if (Accelerometer) {
  // 30 readings per second, 60 readings per batch
  // the callback will be called once every two seconds
  const accel = new Accelerometer({ frequency: 30, batch: 60 });
  accel.addEventListener("reading", () => {
    for (let index = 0; index < accel.readings.timestamp.length; index++) {
      console.log(
        `Accelerometer Reading: \
          timestamp=${accel.readings.timestamp[index]}, \
          [${accel.readings.x[index]}, \
          ${accel.readings.y[index]}, \
          ${accel.readings.z[index]}]`
      );
    };
  });
  accel.start();
  accel.stop();
}


if (HeartRateSensor) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
        ascii_data += `${hrm.heartRate}, ${hrm.timestamp}\n`;
        fs.writeFileSync("ascii.txt", ascii_data, "ascii");
        let ascii_read = fs.readFileSync("ascii.txt", "ascii");
        console.log("ASCII Data: " + ascii_read);
        
   });
   hrm.start();

} else {
   console.log("This device does NOT have a HeartRateSensor!");
}
let ascii_read = fs.readFileSync("ascii.txt", "ascii");
console.log("ASCII Data: " + ascii_read);
