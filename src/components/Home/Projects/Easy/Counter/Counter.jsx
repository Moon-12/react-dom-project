import { AddIcon } from "../../../../../icons/AddIcon";
import { RemoveIcon } from "../../../../../icons/RemoveIcon";
import { ResetIcon } from "../../../../../icons/ResetIcon";
import "./Counter.css";
import { useState } from "react";
import ProjectDisabled from "../../ProjectDisabled/ProjectDisabled";
import useProjectEnabled from "../../useProjectEnabled";

const Counter = () => {
  const isCounterEnabled = useProjectEnabled(
    "Mini Dom Projects",
    "Counter",
    "Easy"
  );

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
      default:
    }
  };
  return isCounterEnabled ? (
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
  ) : (
    <ProjectDisabled projectName={"Counter"} />
  );
};

export default Counter;
