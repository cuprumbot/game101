/* ----- express and socket.io ----- */

var express = require('express'),
    app 	= express(),
	http 	= require('http'),
	server 	= http.createServer(app),
	io 		= require('socket.io').listen(server);

app.use(express.static('public'));
server.listen(8080);

io.sockets.on('connection', function (socket) {
  	console.log('Successfully connected to websockets');
});

/* ----- serialport ----- */

var SerialPort = require('serialport').SerialPort;
var port = new SerialPort("COM27", { baudrate:9600 }, false);

port.open(function() {
	console.log('Successfully connected to serial port');

	port.on('data', function(data) {
	    console.log('data received: ' + data);
	    io.emit('canvasmsg', data);
	});
});

/*
var serialport = require('serialport');
var port;

function connect () {
	serialport.list(function (err, ports) {
		console.log('Ports found: ' + ports.length);
		
		if (ports.length > 0) {
			console.log('Trying to connect to port ' + ports[0].comName);			
			if (port === undefined || !port.isOpen()) {
				port = new serialport.SerialPort(ports[0].comName, { baudrate:9600 });
			}

			port.on('open', function() {
				console.log('Successfully connected to port ' + ports[0].comName);
				
				port.on('data', function(data) {
	        		console.log('data received: ' + data);
	        		io.emit('canvasmsg', data);
	    		});
			});
		} else {
			setTimeout(connect, 10000);
		}
	});
};

connect();
*/