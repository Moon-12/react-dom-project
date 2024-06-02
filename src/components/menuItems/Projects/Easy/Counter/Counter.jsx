import { AddIcon } from "../../../../../icons/AddIcon";
import { RemoveIcon } from "../../../../../icons/RemoveIcon";
import { ResetIcon } from "../../../../../icons/ResetIcon";
import "./Counter.css";
import { useState } from "react";
const Counter = () => {
  const [count, setCount] = useState(0);
  const handleClick = (name) => {
    switch (name) {
      case "inc":
        setCount((prevCount) => prevCount + 1);
        break;
      case "dec":
        setCount((prevCount) => prevCount - 1);
        break;
      case "reset":
        setCount(0);
        break;
    }
  };
  return (
    <div className="counter-container">
      <h1>Counter</h1>
      <h2>{count}</h2>
      <div className="counter-btns">
        <button onClick={() => handleClick("inc")}>
          <AddIcon />
        </button>
        <button onClick={() => handleClick("reset")}>
          <ResetIcon />
        </button>
        <button onClick={() => handleClick("dec")}>
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default Counter;
