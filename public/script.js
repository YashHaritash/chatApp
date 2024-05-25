let socket = io();

let btnSend = document.getElementById('btnSend');
let inpMsg = document.getElementById('inpMsg');
let ulMsgList = document.getElementById('ulMsgList');

btnSend.onclick = ()=>{
    let msg = inpMsg.value
    socket.emit('newMessage',{msg:msg});
    inpMsg.value = '';
}

socket.on('rnewMessage',(obj)=>{
    let child = document.createElement('li');
    child.innerText = `${obj.msg}`;
    ulMsgList.appendChild(child);
})