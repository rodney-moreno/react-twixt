const http = require('http');
const express = require('express');
const app = express();

const clientPath = `${__dirname}/../client/public`;
app.use(express.static(clientPath));

const server = http.createServer(app);

server.on('error', function(err) {
	console.error('Server error: ', err);
});

server.listen(8080, function() {
	console.log('Listening on 8080');
});


