import Board from "./Board";
import {useState} from "react"
function Container() {
    const [color, setColor] = useState("black");
  return (
    <div className="conatiner">
      <div className="color-picker">
        <input type="color" value={color} onChange={e => setColor(e.target.value)}></input>
      </div>
      <div className="board-container">
          <Board color={color}></Board>
      </div>
    </div>
  );
}

export default Container;
