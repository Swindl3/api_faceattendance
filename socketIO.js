let data = require('./faceAtt-API')
exports.io = async (http) => {
    let io = require('socket.io')(http, {
        
    })
    io.on("connection", (client) => {
        client.emit("TEST", "This message sent from API");
        // client.emit("TEST",message)
        console.log('user connected')
        // เมื่อ Client ตัดการเชื่อมต่อ
        client.on('disconnect', () => {
            console.log('user disconnected')
        })
        // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
        client.on('sent-message', function (message) {
            io.sockets.emit('new-message', message)       
        })
    })
}