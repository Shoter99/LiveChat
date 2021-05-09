const moment = require('moment')
const mysql = require('mysql')
var messages
const con = mysql.createConnection({
    host: "sql4.freesqldatabase.com",
    user: "sql4411262",
    password: "RWGPprsAti",
    database: "sql4411262"
})
con.connect()

async function QueryMessages(roomID){
    const sql = `SELECT * FROM messages WHERE RoomID = "${roomID}"`
    const result = await con.promise().query(sql)
    return result
}

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
function GetMessages(roomID, callback){
    
    con.query('SELECT * FROM messages WHERE RoomID = ?', [roomID], (err, rows) => {
        const messages = []
        if(err) return callback(err, null)
        rows.forEach(row => {
            const message = {
                id: row.ID,
                roomID: row.RoomID,
                username: row.Username,
                text: row.Text,
                time: row.Time
            }
            messages.push(message)
            callback(null, messages)
        })
    })
}



module.exports = {
    FormatMessages,
    AddMessage,
    GetMessages
}