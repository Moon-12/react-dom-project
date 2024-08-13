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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ImagePopup from "./ImagePopup/ImagePopup";

export default function FlashCard({
  selectedTopic,
  curIndex,
  handleNavigation,
}) {
  const role = useSelector((state) => state.auth.role);
  const [flip, setFlip] = useState(false);
  const [url, setUrl] = useState("");
  const [openImgPopup, setOpenImgPopup] = useState(false);
  const flashcard = useSelector((state) => state.flashcardReducer.flashcard);
  useEffect(() => {
    setFlip(false);
  }, [selectedTopic, curIndex]);

  const handleImagePopupModal = () => {
    setOpenImgPopup(!openImgPopup);
  };

  const { answer, title, question, imgPath } =
    (flashcard[selectedTopic] && flashcard[selectedTopic][curIndex]) || {};

  if (imgPath) {
    const storage = getStorage();
    getDownloadURL(ref(storage, imgPath)).then((url) => {
      setUrl(url);
    });
  }

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
                <div className="card-header">
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                    component="div"
                  >
                    {title}
                  </Typography>
                  <div className="card-action-btns ">
                    {imgPath ? (
                      <Tooltip title="Enlarge Image">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImagePopupModal();
                          }}
                        >
                          <OpenInFullIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      ""
                    )}
                    {role === "admin" ? (
                      <Tooltip title="Delete Flashcard">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <Typography component="div" variant="h6">
                  {question}
                </Typography>
                {imgPath ? (
                  <CardMedia
                    sx={{ height: "18em", width: "25em" }}
                    image={url}
                  />
                ) : null}
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
          Previous
        </Button>
        <Button
          className="nav-btn"
          variant="contained"
          size="medium"
          onClick={() => handleNavigation(1)}
          disabled={curIndex === flashcard[selectedTopic]?.length - 1}
        >
          Next
        </Button>
      </div>
      <ImagePopup
        open={openImgPopup}
        handleModal={handleImagePopupModal}
        imageURL={url}
      />
    </>
  );
}
