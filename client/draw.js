export default class Draw {
    constructor (canvas, socket) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.flag = false
        this.prevX = 0
        this.currX = 0
        this.prevY = 0
        this.currY = 0
        this.dot_flag = false
        this.x = "black"
        this.y = 6
        this.socket = socket
    }

    changeColor (color) {
        if (color === 'white') {
            this.y = 16
            this.x = 'white'
        } else {
            this.y = 6
            this.x = color
        }
    }
 
    draw () {
        this.ctx.beginPath();
        this.ctx.moveTo(this.prevX, this.prevY);
        this.ctx.lineTo(this.currX, this.currY);
        this.ctx.strokeStyle = this.x;
        this.ctx.lineWidth = this.y;
        this.ctx.stroke();
        this.ctx.closePath();
        this.emitDraw()
    }

    emitDraw () {
        this.socket.drawEmit(this.canvas.toDataURL())
    }

    emittedDraw (canvas) {
        const img = new Image()

        const start = () => {
            this.ctx.drawImage(img,0,0)
        }

        img.onload = start;
        img.src = canvas;

    }
    
    out () {
        this.flag = false
    }
    
    move (e) {
        if (this.flag) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = (e.clientX || e.touches[0].clientX) - this.canvas.offsetLeft;
            this.currY = (e.clientY || e.touches[0].clientY) - this.canvas.offsetTop;
            this.draw();
        }
    }

    down (e) {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = (e.clientX || e.touches[0].clientX) - this.canvas.offsetLeft;
        this.currY = (e.clientY || e.touches[0].clientY) - this.canvas.offsetTop;

        this.flag = true;
        this.dot_flag = true;

        if (this.dot_flag) {  
            // this.ctx.beginPath();
            // this.ctx.fillStyle = this.x;
            // this.ctx.fillRect(this.currX, this.currY, );
            // this.ctx.closePath();
            // this.emitDraw()
            // this.dot_flag = false;
        }
    }
    
}