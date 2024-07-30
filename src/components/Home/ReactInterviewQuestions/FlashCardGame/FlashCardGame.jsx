import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FlashCard from "./FlashCard/FlashCard";
import { useState } from "react";
import "./FlashCardGame.css";
import { useSelector } from "react-redux";

export default function SelectTopic(props) {
  const [selectedTopic, setSelectedTopic] = useState("React");
  const [curIndex, setCurIndex] = useState(0);
  const flashcard = useSelector((state) => state.flashcardReducer.flashcard);
  const topics = Object.keys(flashcard);
  const handleNavigation = (direction) => {
    setCurIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      return newIndex;
    });
  };

  const handleTopicChange = (event) => {
    setCurIndex(0); // reset index
    setSelectedTopic(event.target.value);
  };
  // const topics = ["math", "science", "history"];

  return (
    <Box sx={{ margin: "1em" }} className="card-container">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTopic}
          label="topic"
          sx={{ fontSize: "large" }}
          onChange={handleTopicChange}
        >
          {topics.map((topic) => {
            return (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FlashCard
        curIndex={curIndex}
        selectedTopic={selectedTopic}
        handleNavigation={handleNavigation}
      />
    </Box>
  );
}
