import { useEffect, useState } from "react";
import axios from "axios";
import "./RandomJokes.css";
import useProjectEnabled from "../../useProjectEnabled";
import ProjectDisabled from "../../ProjectDisabled/ProjectDisabled";

const RandomJokes = () => {
  const isRandomJokesEnabled = useProjectEnabled(
    "Mini Dom Projects",
    "Random Jokes",
    "Easy"
  );
  const [joke, setJoke] = useState("");

  const getJoke = () => {
    axios
      .get("https://icanhazdadjoke.com", {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        setJoke(res.data.joke);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = () => {
    getJoke();
  };

  useEffect(() => {
    getJoke();
    const intervalId = setInterval(getJoke, 5000);
    return () => clearInterval(intervalId);
  }, []);
  return isRandomJokesEnabled ? (
    <div className="joke-container">
      <h2 className="joke-header">Don't Laugh Challenge</h2>
      <div>{joke}</div>
      <button className="get-joke-btn" onClick={handleClick}>
        Get Another Joke
      </button>
    </div>
  ) : (
    <ProjectDisabled projectName="Random Jokes" />
  );
};

export default RandomJokes;
