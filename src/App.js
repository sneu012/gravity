import React, { Component } from 'react';
import './App.css';


class App extends Component {

  componentDidMount() {
    const canvas = this.refs.myCanvas
    const ctx = canvas.getContext("2d")
    this.setState({
      canvas,
      ctx
    }, this.init)

  }

  init() {

      let { ctx, canvas } = this.state;
      ctx.font = "40px Courier"
      let mouse = {};

      const handleMove = (event) => {
        mouse.x = event.clientX
        mouse.y = event.clientY;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawCircle(ctx, event.clientX, event.clientY, 3);
      }
      canvas.addEventListener('mousedown', event => {

        mouse.x = event.clientX
        mouse.y = event.clientY;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawCircle(ctx, event.clientX, event.clientY, 3);

        canvas.addEventListener('mousemove', handleMove)

        canvas.addEventListener('mouseup', () => {
          canvas.removeEventListener("mousemove", handleMove)
        })
        
      })

      // window.addEventListener( "keydown", event => {
      //   console.log("event ", event)
      //   this.drawCircle(ctx, pos.x, pos.y, 3);
      //   switch(event.code) {
      //     case "KeyD":
      //       pos.x += 25;
      //     break;

      //     case "KeyA":
      //       pos.x -= 25;
      //     break;

      //     case "KeyW":
      //       pos.y -= 25;
      //     break;

      //     case "KeyS":
      //       pos.y += 25
      //     break;
      //     case " ": 
      //       //this.drawCircle(ctx, x, y, dy, up)
      //     break;

      //     default:
      //   }
      // } )

     
  }
  
  drawCircle(ctx, x, y, dy, up) {
    ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height)
    ctx.beginPath()
    console.log("y is" ,y , "dy is ", dy, "canvas height ", this.state.canvas.height)
    if(y + 20 > this.state.canvas.height) {
      dy = dy < 0 ? dy * 0.8 : -dy * 0.8
    } else {
      dy += 1
    }

    y += dy
    if(y > 500) y = 500;
  
    ctx.arc(x, y, 20, 0, Math.PI * 2, false)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    window.requestAnimationFrame((() => this.drawCircle(ctx, x, y, dy)))
  }


  render() {
    return (
      <div>
        <canvas ref="myCanvas" width={640} height={500} style= {{border: "2px solid"}} />
      </div>
    );
  }
}

export default App;
