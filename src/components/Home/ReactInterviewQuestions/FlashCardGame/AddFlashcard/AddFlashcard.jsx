import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormProvider, useForm } from "react-hook-form";
import TextArea from "../../../../FormElements/TextArea/TextArea";
import {
  combineValidators,
  maxLengthValidation,
  requiredValidation,
} from "../../../../FormElements/validatorRules";
import ImageUpload from "./ImageUpload/ImageUpload";
import { fireStoreDB, storage } from "../../../../../firebase/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import TextFieldInput from "../../../../FormElements/TextField/TextField";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import AutoCompleteInput from "../../../../FormElements/AutoCompleteInput/AutoCompleteInput";
import { useEffect } from "react";
import "./AddFlashcard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddFlashcardModal({ open, handleModalFn }) {
  const methods = useForm();
  const { reset } = methods;

  useEffect(() => {
    reset();
  }, [open, reset]);

  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Handle empty or null strings
    if (string.length === 1) return string.toUpperCase(); // Handle single-character strings
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const handleImageUpload = (imgFile, newFlashcardData) => {
    if (imgFile) {
      const imageRef = ref(storage, `flashcard_uploads/${v4()}`);
      uploadBytes(imageRef, imgFile)
        .then((snapshot) => {
          const { fullPath } = snapshot.metadata || {};
          newFlashcardData.imgPath = fullPath;
          handleFlashCardUpload(newFlashcardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFlashCardUpload = (newFlashcardData) => {
    const targetTopic = capitalizeFirstLetter(newFlashcardData.topic);
    const flashcardMetaDataDocRef = doc(
      fireStoreDB,
      "common",
      "flashcard-metadata"
    );
    getDoc(flashcardMetaDataDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();

          // Check if the topic exists, otherwise initialize it as an empty array
          const existingFlashcards = data[targetTopic] || [];

          // Add the new flashcard to the array
          const updatedFlashcards = [...existingFlashcards, newFlashcardData];
          console.log(newFlashcardData, "new");
          // Update the document with the new array
          updateDoc(flashcardMetaDataDocRef, {
            [targetTopic]: updatedFlashcards,
          });
          handleModalFn();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submit = methods.handleSubmit((newFlashcardData) => {
    const imgFile = newFlashcardData.imgPath[0];
    if (newFlashcardData.imgPath.length > 0) {
      handleImageUpload(imgFile, newFlashcardData);
    } else {
      newFlashcardData.imgPath = "";
      handleFlashCardUpload(newFlashcardData);
    }
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalFn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={(event) => event.preventDefault()} noValidate>
              <AutoCompleteInput
                fieldName="topic"
                validators={requiredValidation()}
              />
              <TextFieldInput
                fieldName="title"
                placeholder="Title"
                validators={requiredValidation()}
              />
              <TextArea
                fieldName="question"
                placeholder="Type in the question...."
                maxRows={4}
                validators={combineValidators(
                  requiredValidation(),
                  maxLengthValidation()
                )}
              />
              <TextArea
                fieldName="answer"
                placeholder="Type in the answer..."
                maxRows={4}
                validators={combineValidators(
                  requiredValidation(),
                  maxLengthValidation()
                )}
              />
              <ImageUpload fieldName="imgPath" />
            </form>
            <div className="form-action-btns">
              <Button variant="contained" onClick={submit}>
                Add
              </Button>
              <Button variant="contained" onClick={handleModalFn}>
                Cancel
              </Button>
            </div>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
