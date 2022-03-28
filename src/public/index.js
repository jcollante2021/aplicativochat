let socket = io();
let chatBox = document.getElementById('chatBox')
let log = document.getElementById('log')
let user;

Swal.fire({
    title: "identificate",
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) =>{
        return !value && 'Usuario no valido'
    }
}).then(result =>{
    user = result.value;
})

chatBox.addEventListener('keyup', evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{user, message: chatBox.value.trim()})
            chatBox.value="";
        }
    }
})

socket.on('log', data=>{
    let message="";
    data.forEach(log => {
        message = message + `<b>${log.user}</b> dice: ${log.message} </br>`
    });
    log.innerHTML = message
})