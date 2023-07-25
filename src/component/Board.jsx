import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { HuddleIframe } from "@huddle01/iframe";
import { useContext } from "react";
import { MyContext } from "../App";

function Board(props) {
  const socketRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);
  const timeoutRef = useRef(null);
  const { id } = useParams();
  const { roomId, setRoomId, huddleId, setHuddleId } = useContext(MyContext);

  useEffect(() => {
    const socket = io.connect("https://web3conf-be-production.up.railway.app");
    socketRef.current = socket;

    socket.emit("joinRoom", id);
    console.log(roomId);

    socket.on("canvas", function (data) {
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    drawOnCanvas();
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = props.color;
    ctxRef.current.lineWidth = props.size;
  }, [props.color, props.size]);

  function drawOnCanvas() {
    const canvas = document.querySelector("#board");
    ctxRef.current = canvas.getContext("2d");
    const ctx = ctxRef.current;
  
    const sketch = document.querySelector("#sketch");
    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));
  
    const mouse = { x: 0, y: 0 };
    const last_mouse = { x: 0, y: 0 };
  
    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        const rect = canvas.getBoundingClientRect();
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
  
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
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

    const root = this;
    const onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeoutRef.current != undefined) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(function () {
        const base64ImageData = canvas.toDataURL("image/png");
        socketRef.current.emit("canvas", base64ImageData);
      }, 1000);
    };
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="sketch max-[600px]:flex-col gap-4"
      id="sketch"
    >
      <canvas
        style={{ border: "1px solid black", height: "100vh" }}
        className="board max-[600px]:w-[90%] w-[50%]"
        id="board"
      ></canvas>
      <HuddleIframe className="h-[100vh] w-[50%] max-[600px]:w-full aspect-video rounded-lg" roomUrl={`https://iframe.huddle01.com/${id}`} />
    </div>
  );
}

export default Board;
