export default class ListenerHelper {
    constructor (draw, window, color) {
        this.draw = draw
        this.changeColor = (color) => draw.changeColor(color)
        this.canvas = draw.canvas
        this.move = (e) => draw.move(e)
        this.down = (e) => draw.down(e)
        this.out = () => draw.out()
        this.window = window
        this.color = color
    }

    initializeMouseEvent () {
        this.registerDrawEvent()
        this.registerColorEvent()
    }

    registerColorEvent () {
        this.color.addEventListener('click', (e) => {
            const color = e.target.className.split(' ')[1]
            this.changeColor(color)
        }, false)
    }

    registerDrawEvent () {
        const objEvents = {
            'mousemove': (e) => { this.throttle(this.move(e), 10) },
            'mousedown': (e) => { this.down(e) },
            'mouseup': () => { this.out() },
            'mouseout': () => { this.out() },
            'touchmove': (e) => { this.throttle(this.move(e), 10) },
            'touchstart': (e) => { this.down(e) },
            'touchend': () => { this.out() },
            'touchcancel': () => { this.out() }
        }
    
        for (const o in objEvents) {
            this.canvas.addEventListener(o, (e) => {
                e.preventDefault();
                e.stopPropagation();
                objEvents[o](e)  
            }, false)
        }
    }

    throttle (callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
          var time = new Date().getTime();
    
          if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
          }
        };
      }

}