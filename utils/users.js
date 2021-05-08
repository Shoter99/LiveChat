const users = []

//Join user to chat 
function UserJoin(id, username, roomID){
    const user = {id, username, roomID}

    users.push(user)
    return user
}

function GetCurrentUser(id){
    return users.find(user => user.id === id)
}
function UserLeave(id){
    const index = users.findIndex(user => user.id === id)
    if(index !== -1) return users.splice(index, 1)[0]
}
function GetRoomUsers(roomID){
    return users.filter(user => user.roomID === roomID)
}
module.exports = {
    UserJoin,
    GetCurrentUser,
    UserLeave,
    GetRoomUsers
}