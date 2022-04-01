import React, { useRef, useEffect } from 'react'

const Canvas = props => {
    const { draw, initializer, emote, caption, ...rest } = props

    function resizeCanvas(canvas) {
        const { width, height } = canvas.getBoundingClientRect()
        
        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio:ratio=1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width*ratio
            canvas.height = height*ratio
            context.scale(ratio, ratio)
            return true
        }

        return false
    }
    
    const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')    
    draw(context, initializer, emote, caption);
  }, [draw, initializer, emote, caption])

  return (<div style={{margin: "0 auto", width:`${props.width}`}}>
  <canvas ref={canvasRef} {...rest}/>            
  </div>)
}

export default Canvas