const chatForm = document.getElementById('chat-form')
const chatMessage = document.getElementById('chat')

//Get Username and RoomID
const {username, roomID} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io()

//Join chatroom
socket.emit('joinRoom', {username, roomID})

socket.on('loadMessages', messages => {
    OutputMessages(messages)
})

// Get room and users 
socket.on('roomInfo', ({roomID, users}) => {
    OutputRoomName(roomID)
    OutputUsers(users)
})
//message from server
socket.on('message', message => {
    console.log(message)
    OutputMessage(message)

    chatMessage.scrollTop = chatMessage.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.msg.value
    e.target.elements.msg.value = ""
    e.target.elements.msg.focus()

    //emit message to the server
    socket.emit('chatMessage', msg)
    
})

function OutputMessage(msg){
    const div = document.createElement('div'); 
    div.classList.add('message')
    div.innerHTML = 
    `<p class="info"><span class="nickname">${msg.username}</span>
        <span class="date">${msg.time}</span>
        </p>
        <p class="mes">${msg.text}</p>`
    document.getElementById('chat').appendChild(div)
}
function OutputRoomName(roomID){
    const roomName = document.getElementById('name')
    roomName.innerText = roomID
    
}
function OutputUsers(users){
    const userList = document.getElementById('usersList')
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}
function OutputMessages(messages){
    messages.map(message => {
        OutputMessage(message)
    })
}