const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const users = []
let canvas = null

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile('/client/index.html', { root: '.' } )
})



const server = app.listen(port)

const io = require('socket.io')(server)


io.on('connection', (socket) => {

    // socket.on('disconnect', (reason) => {
    //   users.splice(users.indexOf(socket.name), 1);
    //   socket.broadcast.emit('close person', socket.name, users);
    // });

    socket.on('draw', (_canvas) => {
        canvas = _canvas
        socket.broadcast.emit('draw', _canvas)
    })

    socket.on('addPerson', () => {
        console.log(socket.id)
        users.push(socket.id);
    
        if (canvas) socket.emit('enter', canvas)
        socket.broadcast.emit('addPerson');
    })
});
