var path = require('path');
var spawn = require('child_process').spawn;

var sensors = [
    'ambient_light',
    'button-toggle',
    'button',
    'buzzer',
    'environmental_sensor',
    'fan',
    'gas',
    'led',
    'motion',
    'power-uart',
    'rgb_led',
    'solar',
    'switch',
    'temperature'
];

function showUsage() {
    console.log('Usage:\n\tnode %s <sensor>\n', path.basename(__filename));
    console.log('Sensor:');
    for (var i in sensors) {
        console.log('\t%s', sensors[i]);
    }

    process.exit(1);    
}

var argv = process.argv.slice(2);
if (argv.length < 1) {
    showUsage();
}
