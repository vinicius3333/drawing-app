import Draw from './draw.js';
import ListenerHelper from './listener-helper.js'
import createSocket from './socket-helper.js'

const canvas = document.getElementById('can')

const socketHelper = createSocket()
const draw = new Draw(canvas, socketHelper)
const listenerHelper = new ListenerHelper(draw, window, document.getElementsByClassName('colors')[0])

listenerHelper.initializeMouseEvent()
socketHelper.enter(draw)

const onResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.addEventListener('resize', onResize, false)
onResize()