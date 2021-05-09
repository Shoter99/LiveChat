const moment = require('moment')
const mysql = require('mysql')
const messages =[]

const con = mysql.createConnection({
    host: "sql4.freesqldatabase.com",
    user: "sql4411262",
    password: "RWGPprsAti",
    database: "sql4411262"
})
con.connect()
function FormatMessages(username, text){
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }
}
function AddMessage(id, roomID,username, text, time){
    const message = {id, roomID, username, text, time}
        var sql = `INSERT INTO messages VALUES ("${id}", "${roomID}", "${username}", "${text}", "${time}")`
        con.query(sql, (err, result) => {
            if(err) throw err
        })
    return message
}
function GetMessages(roomID){
        con.query(`SELECT * FROM messages WHERE RoomID = "${roomID}"`, (err, result) =>{
            if(err) return
            return result
        })
}


module.exports = {
    FormatMessages,
    AddMessage,
    GetMessages
}