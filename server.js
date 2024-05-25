const express = require('express');
const sockectio = require('socket.io')
const http = require('http');

const app =express();
const server = http.createServer(app);
const io = sockectio(server);

let users = {}
let userMap = {}
app.use('/',express.static(__dirname+'/public'))
io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.on('login',(data)=>{
        if(users[data.username]){
            if(users[data.username] == data.password){
                userMap[socket.id] = data.username;
                socket.join(data.username);
                socket.emit('logged_in',data);
            }
            else{
                socket.emit('login_failed');
            }
        }
        else{
            users[data.username] = data.password;
            userMap[socket.id] = data.username;
            socket.join(data.username);
            socket.emit('logged_in',data);
        }
        
    })

    socket.on('msg_send',(data)=>{
        if(data.to==0){
            socket.broadcast.emit('msg_rcvd',{msg:data.msg,from:userMap[socket.id]})
        }
        else{
            io.to(data.to).emit('msg_rcvd',{msg:data.msg,from:userMap[socket.id]})
        }
        
    })
})


server.listen(3435,()=>{
    console.log('Server Running on http://localhost:3435');
})