#!/usr/bin/env node

var proto = null;
var path = require('path');
var fs = require('fs');
var ca = null;
var args = process.argv.slice(2);
var options = {
    help: false,
    host: "localhost",
    port: 8000,
    https: false,
    obs: false
};

const okStatusCode = 200; // All right
const usage = "usage: node oic-api-tester.js [options]\n" +
"options: \n" +
"  -?, --help \n" +
"  -h, --host <string>\n" +
"  -p, --port <number>\n" +
"  -s, --https \n" +
"  -o, --obs \n";

for (var i = 0; i < args.length; i++) {
    var arg = args[i];

    switch(arg) {
        case '-?':
        case '--help':
            options.help = true;
            break;
        case '-h':
        case '--host':
            var host = args[i + 1];
            if (typeof host == 'undefined') {
                console.log(usage);
                return;
            }
            options.host = host;
            break;
        case '-p':
        case '--port':
            var num = args[i + 1];
            if (typeof num == 'undefined') {
                console.log(usage);
                return;
            }
            options.port = parseInt(num);
            break;
        case '-s':
        case '--https':
            options.https = true;
            break;
        case '-o':
        case '--obs':
            options.obs = true;
            break;
    }
}

if (options.help == true) {
    console.log(usage);
    return;
}

if (Number.isInteger(options.port) == false) {
    console.log(usage);
    return;
}

if (typeof options.host !== "string") {
    console.log(usage);
    return;
}

if (options.https == true) {
    ca = fs.readFileSync(path.join(__dirname, '..', 'config', 'certificate.pem'));
    proto = require('https');
}
else
	proto = require('http');

var reqOptions = {
	host: options.host,
	port: options.port,
	agent: new proto.Agent({keepAlive: true}),
	headers: {Connection: "keep-alive"},
	ca: ca
}

function findResources(callback) {
	reqOptions.path = "/api/oic/res";
	var json = "";
	discoveryCallback = function(res) {
		res.on('data', function(data) {
			json += data;
		});

		res.on('end', function() {
			if (res.statusCode == okStatusCode) {
				var resources = JSON.parse(json);
				callback(resources);
			} else {
				console.log(json.toString('utf8') );
			}
		});
	}
	var req = proto.request(reqOptions, discoveryCallback);

	req.on('error', function(e) {
		console.log("HTTP Request error %s", e.message);
	});

	req.end();
}

function onResourceFound(resources) {
	console.log("--- onResourceFound:");

	for (var i = 0; i < resources.length; i++) {
		var uri = resources[i].links[0].href;
		console.log("%s : %s", resources[i].di, uri);
		retrieveResources(uri + "?di=" + resources[i].di, onResource, options.obs);
	}
}

function onResource(resource) {
	console.log("--- onResource:");
	console.log(resource.toString('utf8'));
}

function retrieveResources(uri, callback, observe) {
	reqOptions.path = "/api/oic" + uri;
	if (observe) {
		reqOptions.path += "&obs=1";
	}
	var json = "";
	resourceCallback = function(res) {
		res.on('data', function(data) {
			if (observe) {
				callback(data);
			}
			else {
				json += data;
			}
		});

		res.on('end', function() {
			if (json)
			    callback(json);
		});

		res.on('abort', function() {
			console.log("event: abort");
		});
	}
	var req = proto.request(reqOptions, resourceCallback);

	req.on('error', function(e) {
	    console.log("HTTP Request error: %s", e.message);
	});

	req.end();
}

findResources(onResourceFound);
