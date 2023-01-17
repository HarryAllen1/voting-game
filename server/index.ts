import express from 'express';
import { createServer } from 'node:https';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);
app.set('socketio', io);

io.on('connection', (socket) => {
	if (!socket.request.headers.upgrade || socket.request.headers.upgrade !== 'websocket')
		return socket.disconnect(true);
	console.log('a user connected');
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
