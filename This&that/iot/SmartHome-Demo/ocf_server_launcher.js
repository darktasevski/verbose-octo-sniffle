#!/usr/bin/env node


var spawn = require('child_process').spawn;
var path = require('path');

var ocf_server_dir = '/home/root/SmartHome-Demo/ocf-servers/js-servers';
var sensor_js_map = {
    'ambient_light': 'ambient_light.js',
    'button-toggle': 'button-toggle.js',
    'button': 'button.js',
    'buzzer': 'buzzer.js',
    'environmental_sensor': 'environmental_sensor.js',
    'fan': 'fan.js',
    'gas': 'gas.js',
    'led': 'led.js',
    'motion': 'motion.js',
    'power-uart': 'power-uart.js',
    'rgb_led': 'rgb_led.js',
    'solar': 'solar.js',
    'switch': 'switch.js',
    'temperature': 'temperature.js'
};

function showUsage() {
    console.log('Usage: \n\tnode %s <sensor> <timeout>\n', path.basename(__filename));
    console.log('Sensors:')
    for (sensor in sensor_js_map) {
        console.log('\t' + sensor);
    }
    console.log('Timeout:\n\tThe time of the OCF server is running, in second. ' +
                'After that, a SIGINT signal will be sent and the OCF server exits.');
    process.exit(1);    
}

var argv = process.argv.slice(2);
if (argv.length < 2) {
    showUsage();
}

var sensor = argv[0]
var serverDuration = Number(argv[1]) * 1000;

var child = spawn('node', [sensor_js_map[sensor]], {
    cwd: ocf_server_dir,
    env: process.env
});

child.stdout.on('data', function(data) {
    console.log(data);
});


setTimeout(function() {
    child.kill('SIGINT');
}, serverDuration);