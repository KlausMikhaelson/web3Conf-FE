import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const Board = (props) => {
  const timeoutRef = useRef();
  const socketRef = useRef(io.connect("http://localhost:4000"));
  const ctxRef = useRef();
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("canvas", function (data) {
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawingRef.current) return;
        root.isDrawingRef.current = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);

          root.isDrawingRef.current = false;
        };
        image.src = data;
      }, 200);
    });
  }, []);

  useEffect(() => {
    drawOnCanvas();
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = props.color;
    ctxRef.current.lineWidth = props.size;
  }, [props.color, props.size]);

  const drawOnCanvas = () => {
    var canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = props.color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    const onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeoutRef.current != undefined) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("image/png");
        socketRef.current.emit("canvas", base64ImageData);
      }, 1000);
    };
  };

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} className="sketch" id="sketch">
      <canvas style={{width: "90%", height: "70vh", border: "1px solid black", borderRadius: "10px"}} className="board" id="board"></canvas>
    </div>
  );
};

export default Board;
