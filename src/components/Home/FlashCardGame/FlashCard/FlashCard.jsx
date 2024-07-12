import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./FlashCard.css";
import { useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";

const flashcards = {
  math: [
    {
      title: "Math",
      question: "What is 2+2?",
      answer: "4",
    },
    {
      title: "Math",
      question: "What is the square root of 16?",
      answer: "4",
    },
  ],
  science: [
    {
      title: "Science",
      question:
        "What planet is known as the Red Planet? What planet is known as the Red Planet? What planet is known as the Red Planet?",
      answer: "Mars",
    },
    {
      title: "Science",
      question: "What is the chemical symbol for water?",
      answer: "H2O",
    },
  ],
  history: [
    {
      title: "History",
      question: "Who was the first president of the United States?",
      answer: "George Washington",
    },
    {
      title: "History",
      question: "In which year did World War-I end?",
      answer: "1945",
    },
    {
      title: "History",
      question: "test?",
      answer: "1945",
    },
    {
      title: "History",
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
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setFlip(false);
  }, [selectedTopic, curIndex]);

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <div className="flip-card" onClick={() => setFlip(!flip)}>
          <div
            className={`flip-card-inner ${
              flip ? "flip-card-inner-rotate" : ""
            }`}
          >
            <div class="flip-card-back">
              <CardContent>
                <Typography component="div">
                  {flashcards[selectedTopic][curIndex].answer}
                </Typography>
              </CardContent>
            </div>
            <div class="flip-card-front">
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  {flashcards[selectedTopic][curIndex].title}
                </Typography>
                {flashcards[selectedTopic][curIndex].img ? (
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                  />
                ) : null}
                <Typography component="div" variant="h6">
                  {flashcards[selectedTopic][curIndex].question}
                </Typography>
              </CardContent>
            </div>
          </div>
        </div>
      </Box>
      <div className="nav-btn-container">
        <Button
          className="nav-btn"
          variant="contained"
          size="medium"
          onClick={() => handleNavigation(-1)}
          disabled={curIndex === 0}
        >
          prev
        </Button>
        <Button
          className="nav-btn"
          variant="contained"
          size="medium"
          onClick={() => handleNavigation(1)}
          disabled={curIndex === flashcards[selectedTopic].length - 1}
        >
          next
        </Button>
      </div>
    </>
  );
}
