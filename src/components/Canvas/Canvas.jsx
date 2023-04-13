import { useRef, useEffect } from "react";
// import { Parser } from "html-to-react";

import "./style.css";

// const rawHTML = `
// <div>
// <main>
// <!-- GRADIENT BACKGROUND -->
// <canvas id="gradient-canvas"></canvas>
// </main>
// // <script src="gradient.js"></script>
// </div>
// `;

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
    gradient.addColorStop(0.4, "#26A871");
    gradient.addColorStop(0.6, "#5F10C5");
    gradient.addColorStop(0.8, "#ef008f");

    // fill rectangle with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");
  //     gradient(canvas, context);
  //   }, []);

  return (
    <div>
      <canvas id="gradient-canvas" ref={canvasRef} {...props} />
      {/* {Parser().parse(rawHTML)} */}
    </div>
  );
};

export default Canvas;
