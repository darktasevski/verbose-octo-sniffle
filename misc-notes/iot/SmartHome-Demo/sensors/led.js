// This code is extracted from SmartHome-Demo
// http://github.com/01org/SmartHome-Demo.git
// 
// Summary:
//  Use mraa module to control the LED.
// Requirements:
//   Intel Edison
//   Grove LED
// Pin connection
//   Edison -- LED
//   3.3V   -- VCC
//   GND    -- GRN
//   GPIO 2 -- SIG

var path = require('path');
var powerOn;

var mraa = '';
try {
    mraa = require('mraa');
} catch (e) {
    console.log('No mraa module: ', e.message);
    process.exit(1);
}

function showUsage() {
    console.log('Usage: \n\tnode %s [on/off]\n', path.basename(__filename));
    console.log('\ton: power on the led, default value if not specified.');
    console.log('\toff: power off the led.');

    process.exit(0);
}

var argv = process.argv.slice(2);
if (argv.length < 1) {
    powerOn = true;
} else {
    switch(argv[0]) {
        case '1':
        case 'on':
            powerOn = true;
            break;
        case '0':
        case 'off':
            powerOn = false;
            break;
        default:
            showUsage();    
    }    
}

var sensorPin = new mraa.Gpio(2);
sensorPin.dir(mraa.DIR_OUT);
if (powerOn) 
    sensorPin.write(1);
else
    sensorPin.write(0);
