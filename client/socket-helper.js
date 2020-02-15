export default function SocketHelper () {
    let draw = null
    const socket = io()

    function enter (_draw) {
        draw = _draw
        socket.emit('addPerson')
    }

    function drawEmit (canvas) {
        socket.emit('draw', canvas)
    }

    socket.on('draw', (canvas) => {
        draw.emittedDraw(canvas)
    })

    socket.on('enter', (canvas) => {
        draw.emittedDraw(canvas)
    })

    return {
        enter, drawEmit
    }
}
