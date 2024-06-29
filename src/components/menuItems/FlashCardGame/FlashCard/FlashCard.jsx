import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./FlashCard.css";
import { useEffect } from "react";
const flashcards = {
  math: [
    {
      question: "What is 2+2?",
      answer: "4",
    },
    {
      question: "What is the square root of 16?",
      answer: "4",
    },
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      answer: "Mars",
    },
    {
      question: "What is the chemical symbol for water?",
      answer: "H2O",
    },
  ],
  history: [
    {
      question: "Who was the first president of the United States?",
      answer: "George Washington",
    },
    {
      question: "In which year did World War-I end?",
      answer: "1945",
    },
    {
      question: "test?",
      answer: "1945",
    },
    {
      question: "test1?",
      answer: "1945",
    },
  ],
};

export default function FlashCard({
  selectedTopic,
  curIndex,
  handleNavigation,
}) {
  const [flip, setFlip] = useState(true);

  useEffect(() => {
    setFlip(false);
  }, [selectedTopic, curIndex]);

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined" onClick={() => setFlip(!flip)}>
          {flip ? (
            <CardContent>
              <Typography component="div">
                {flashcards[selectedTopic][curIndex].answer}
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <Typography component="div">
                {flashcards[selectedTopic][curIndex].question}
              </Typography>
            </CardContent>
          )}
        </Card>
      </Box>
      <Button
        variant="contained"
        size="medium"
        onClick={() => handleNavigation(-1)}
        disabled={curIndex === 0}
      >
        prev
      </Button>
      <Button
        variant="contained"
        size="medium"
        onClick={() => handleNavigation(1)}
        disabled={curIndex === flashcards[selectedTopic].length - 1}
      >
        next
      </Button>
    </>
  );
}
