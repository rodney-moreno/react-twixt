var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var mysql = require('mysql');


var connection = mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.name
})

connection.connect(function(err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}

	console.log("connected to DB")
});

const express = require('express');
const app = express();
app.use(express.json());
const http = require('http').createServer(app);
const port = 8080;
const socketIO = require('socket.io');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

app.post('/register', (req, res) => {

	/* form validation */
	

	bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
		if(err) {
			throw err;
		} else {
			connection.query(`INSERT INTO users (user_name, user_hash) VALUES (\"${req.body.username}\", \"${hash}\")`, function(err, result) {
				if(err) {
					throw err;
				}
			});
		}
	})
	
	res.send("Receieved")
});

app.post('/login', (req, res) => {

});

http.listen(port, () => console.log(`Listenting on port ${port}`));