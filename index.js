var SerialPort = require("serialport").SerialPort;
var serialport = require("serialport");
var Frame = require("./frame").Frame;
var conf =  {};


// var find_arduino = function() {
//   serialport.list(function (err, ports) {
//     ports.forEach(function(port) {
//       console.log(port.comName);
//       console.log(port.pnpId);
//       console.log(port.manufacturer);
//       if (port.manufacturer == "Arduino (www.arduino.cc)" ){
//         console.log("win: " + port.comName);
//         conf.comName = port.comName;
//       }
//     });
//   });
// };

// find_arduino();

// console.log(conf);

//Dog ate some of the LEDs.
var safeCount = function(count) {
  var dogAte = [2,13,15,20,21];
  if (dogAte.indexOf(count) == -1){
    return count;
  } else {
    return count + 1;
  }
};

// frame.data is an object of LEDs in the format {LED# : [R,G,B]}
var frame = new Frame();

var sp = new SerialPort("/dev/cu.usbmodemfa131", {
  //parser: serialport.parsers.readline("\n"),
  baudrate: 115200
}, false);

sp.open(function () {
  console.log('open');
  sp.on('data', function(data) {
    console.log('data received: ' + data);
  });
  sp.write("CHECK\n");
  sp.write("CHECK\n");
  frame.blank();
  sp.write(frame.dataString());
  sp.write(frame.buffer());
  var count = 0;



  setInterval(function(){
    count = safeCount(count);
    if (count <= frame.totalLEDs) {
      frame.blank();
      //frame.all([255,255,255]);
      //frame.setLED(count, [255,255,])
      frame.data[count] = [255,255,255];
      frame.data[safeCount(count) + 1] = [255,0,0];
      frame.data[safeCount(count) + 2] = [0,255,0];
      frame.data[safeCount(count) + 3] = [0,0,255];
      sp.write(frame.dataString());
      sp.write(frame.buffer());
      count++;
    } else {
      frame.blank();
      sp.write(frame.dataString());
      sp.write(frame.buffer());
      count = 0;
    }
  }, 1000);

});

