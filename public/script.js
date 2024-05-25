let socket = io();
let username;

$('#loginBox').show();
$('#chatBox').hide();

$('#btnStart').click(()=>{
    socket.emit('login',{
        username : $('#username').val()
    })
})

socket.on('logged_in',(data)=>{
    username = data.username;
    $('#loginBox').hide();
    $('#chatBox').show();
    $('#greeting').text(`Hello ${username}`);
})

$('#btnSendMsg').click(()=>{
    socket.emit('msg_send',{
        to : $('#inpToUser').val(),
        msg : $('#inpNewMsg').val(),
        me : username
    })
})

socket.on('msg_rcvd',(data)=>{
    let child = $('<li></li>');
    child.text(`${data.msg} -from : ${data.from}`);
    $('#chatBox').append(child);
})