const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const mysql = require('mysql')
const {FormatMessages, AddMessage, GetMessages} = require('./utils/messages')
const {UserJoin, GetCurrentUser, UserLeave, GetRoomUsers} = require('./utils/users')


const app = express()
const server = http.createServer(app)
const PORT = 3000 || process.env.PORT

const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    socket.on('joinRoom', ({username, roomID}) => {
        

        const user = UserJoin(socket.id, username, roomID);
        socket.join(user.roomID)
        //load messages
        socket.emit('loadMessages',GetMessages(roomID)
        )
        //emit welcome message for connecting user
        //socket.emit('message', FormatMessages('Server', 'Welcome to the chat!'))
        //broadcast message when user joins chat
        socket.broadcast.to(user.roomID).emit('message', FormatMessages('Server', `${user.username} has joined the chat`) )
        //send users and room info
        io.to(user.roomID).emit('roomInfo', {
            roomID: user.roomID,
            users: GetRoomUsers(roomID),
            
        })

    })

    //listen for chat message
    socket.on('chatMessage', msg => {
        const user = GetCurrentUser(socket.id)
        const message = FormatMessages(user.username, msg)
        io.to(user.roomID).emit('message', FormatMessages(user.username, msg))
        AddMessage(socket.id,user.roomID, message.username, message.text, message.time)
    })

    //emit message when user leave the chat
    socket.on('disconnect', () => {
        const user = UserLeave(socket.id)

        if(user){ 
            io.to(user.roomID).emit('message', FormatMessages('Server', `${user.username} has left the chat`))
            
            io.to(user.roomID).emit('roomInfo', {
            roomID: user.roomID,
            users: GetRoomUsers(user.roomID)
        })
    }
    })
    
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
