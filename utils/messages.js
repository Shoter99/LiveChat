const moment = require('moment');
const messages = []
function FormatMessages(username, text){
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }
}
function AddMessage(id, roomID,username, text, time){
    const message = {id, roomID, username, text, time}

    messages.push(message)
    return message
}
function GetMessages(roomID){
    return messages.filter(message => message.roomID === roomID)
}


module.exports = {
    FormatMessages,
    AddMessage,
    GetMessages
}