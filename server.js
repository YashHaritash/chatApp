const express = require('express');
const sockectio = require('socket.io')
const http = require('http');

const app =express();
const server = http.createServer(app);
const io = sockectio(server);

app.use('/',express.static(__dirname+'/public'))
io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.on('newMessage',(obj)=>{
        io.emit('rnewMessage',obj);
    })
})


server.listen(3435,()=>{
    console.log('Server Running on http://localhost:3435');
})