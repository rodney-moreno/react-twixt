const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 8080;
const socketIO = require('socket.io');


const io = socketIO(http);

io.on('connection', socket => {;

	socket.on('peg dropped', (data) => {
		console.log("peg dropped");
		io.sockets.emit('peg dropped', data);
	})


	socket.on('disconnect', () => {
		console.log('User disconnected');
	})
})



http.listen(port, () => console.log(`Listenting on port ${port}`));