let socket = io();
let chatBox = document.getElementById('chatBox')
let log = document.getElementById('log')
let user;
let today = new Date();
let hour = today.getHours() + ':' + today.getMinutes();
let ampm = today.getHours() >= 12 ? 'pm' : 'am';
let date = hour + ' ' + ampm    

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
    data.reverse().forEach(log => {
        message = message + `<div class="bubbleChat">
                                <div class="triangle"></div>
                                <h4 class="user">${log.user}</h4>
                                <span class="message">${log.message}</span>
                            </div>
                            <span class="hour">${date}</span>`
    });
    log.innerHTML = message
})