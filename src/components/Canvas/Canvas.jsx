import { useRef, useEffect } from "react";
import "./style.css";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // create linear gradient
    const gradient = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0.4, "#7743C9");
    gradient.addColorStop(0.6, "#F4BA40");
    gradient.addColorStop(0.7, "#51b98d");

    // fill rectangle with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div>
      <canvas id="gradient-canvas" ref={canvasRef} {...props} />
    </div>
  );
};

export default Canvas;
