var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs')

	app.listen(3000);

function handler(req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
			res.writeHead(200);
			res.end(data);
		});
}

io.sockets.on('connection', function (socket) {
	console.log('Socket ID is' + socket.id);
  
  socket.emit('news', 'Welcome to chat!');
  
  socket.on('send message', function (data) {
  	io.sockets.emit('new message' , data);
  });

  socket.on('send message2', function (data){
  	io.sockets.in('beta').emit('new message', data);
  });

  socket.on('subscribe', function (data){
  	socket.join(data.room);
  	console.log('These are the rooms:', io.sockets.manager.rooms);
  });
});
