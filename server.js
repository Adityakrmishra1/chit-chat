const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;



http.listen(PORT, () => {
	console.log(`Listening at ${PORT}`);
})

app.use(express.static(__dirname + '/public/'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


//socket

const io = require('socket.io')(http);

io.on('connection', (socket) => {
	console.log("conntected...");
	// Listening from client .. side........

	socket.on('message', (msg) => {
		console.log(msg);
		//sending to all whoever connected to.... (braodcast )

		socket.broadcast.emit('message', msg);
		

	})
});