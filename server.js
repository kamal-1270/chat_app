const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require("path");
const PORT = process.env.PORT || 2000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})