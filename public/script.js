let socket = io();
let username;

$('#loginBox').show();
$('#chatBox').hide();

$('#btnStart').click(()=>{
    socket.emit('login',{
        username : $('#username').val(),
        password : $('#password').val()
    })
})

socket.on('logged_in',(data)=>{
    username = data.username;
    $('#loginBox').hide();
    $('#chatBox').show();
    $('#greeting').text(`Hello ${username}`);
})

socket.on('login_failed',(data)=>{
    $('#greeting').text(`Incorrect Password`);
    $('#username').val('');
    $('#password').val('');
})

$('#btnSendMsg').click(()=>{
    socket.emit('msg_send',{
        to : $('#inpToUser').val(),
        msg : $('#inpNewMsg').val(),
    })
    $('#inpToUser').val('');
    $('#inpNewMsg').val('');
})

socket.on('msg_rcvd',(data)=>{
    let child = $('<li></li>');
    child.text(`${data.msg} -from : ${data.from}`);
    $('#chatBox').append(child);
})