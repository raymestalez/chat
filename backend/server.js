/* Set path to frontend files */
const path = require('path');
const frontendFilesPath = path.join(__dirname, '../frontend');

const socketIO = require('socket.io');
const http = require('http');


/* Create express app */
var express = require('express');
var app = express();

/* Configure app to work with socket.io */
/* io variable is a web sockets server */
var server = http.createServer(app);
var io = socketIO(server);

/* Configure middleware to serve frontend files */
app.use(express.static(frontendFilesPath));


io.on('connection', (socket) => {
    console.log('New user connected');

    /* emit event with data */
    /* Sending a message to all clients */
    socket.emit('newMessage', {
	from: 'ray@site.com',
	text: 'hello!',
	createdAt: 123123
    });

    /* listening to the event */
    /* once client sends me a message, I save it. */
    socket.on('createMessage', (message) => {
	console.log('Create message: ', message);
    });

    /* Disconnect */
    socket.on('disconnect', () => {
	console.log('Client has disconnected');
    });
    
});



/* Set port for heroku. Use 3000 by default. */
const port = process.env.PORT || 3000;
/* Start server */
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
