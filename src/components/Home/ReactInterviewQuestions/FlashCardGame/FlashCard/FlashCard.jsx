import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./FlashCard.css";
import { useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function FlashCard({
  selectedTopic,
  curIndex,
  handleNavigation,
}) {
  const [flip, setFlip] = useState(false);
  const flashcard = useSelector((state) => state.flashcardReducer.flashcard);
  useEffect(() => {
    setFlip(false);
  }, [selectedTopic, curIndex]);

  const { answer, title, question, img } =
    (flashcard[selectedTopic] && flashcard[selectedTopic][curIndex]) || {};
  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <div className="flip-card" onClick={() => setFlip(!flip)}>
          <div
            className={`flip-card-inner ${
              flip ? "flip-card-inner-rotate" : ""
            }`}
          >
            <div className="flip-card-back">
              <CardContent>
                <Typography component="div">{answer}</Typography>
              </CardContent>
            </div>
            <div className="flip-card-front">
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ fontWeight: "bold" }}
                  component="div"
                >
                  {title}
                </Typography>
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                {img ? (
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                  />
                ) : null}
                <Typography component="div" variant="h6">
                  {question}
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
          disabled={curIndex === flashcard[selectedTopic]?.length - 1}
        >
          next
        </Button>
      </div>
    </>
  );
}
