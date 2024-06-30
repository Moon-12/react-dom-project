import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FlashCard from "./FlashCard/FlashCard";
import { useState } from "react";

export default function SelectTopic(props) {
  const [selectedTopic, setSelectedTopic] = useState("math");
  const [curIndex, setCurIndex] = useState(0);

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
  const topics = ["math", "science", "history"];

  return (
    <Box sx={{ width: "10em", margin: "1em" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTopic}
          label="topic"
          onChange={handleTopicChange}
        >
          {topics.map((topic) => {
            return <MenuItem value={topic}>{topic}</MenuItem>;
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
