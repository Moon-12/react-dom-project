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
import { useSelector } from "react-redux";
import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

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
  const flashcard = useSelector((state) => state.flashcardReducer.flashcard);

  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Handle empty or null strings
    if (string.length === 1) return string.toUpperCase(); // Handle single-character strings
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const handleImageUpload = (imgFile, data) => {
    if (imgFile) {
      const imageRef = ref(storage, `flashcard_uploads/${v4()}`);
      uploadBytes(imageRef, imgFile)
        .then((snapshot) => {
          const { fullPath } = snapshot.metadata || {};
          data.imgPath = fullPath;
          handleFlashCardUpload(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFlashCardUpload = (data) => {
    const targetTopic = capitalizeFirstLetter(data.topic);
    if (Object.keys(flashcard).includes(targetTopic)) {
      const flashcardMetaDataDocRef = doc(
        fireStoreDB,
        "common",
        "flashcard-metadata"
      );

      getDoc(flashcardMetaDataDocRef)
        .then((docSnap) => {
          if (docSnap.data()) {
            const topic = docSnap.data()[targetTopic];
            topic.push(data);
            updateDoc(flashcardMetaDataDocRef, {
              [targetTopic]: topic,
            });
          }
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };

  const submit = methods.handleSubmit((data) => {
    const imgFile = data.imgPath[0];
    if (imgFile) {
      handleImageUpload(imgFile, data);
    } else handleFlashCardUpload(data);
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
              <TextFieldInput
                fieldName="topic"
                placeholder="Topic"
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
                minRows={4}
                validators={combineValidators(
                  requiredValidation(),
                  maxLengthValidation()
                )}
              />
              <TextArea
                fieldName="answer"
                placeholder="Type in the answer..."
                minRows={4}
                validators={combineValidators(
                  requiredValidation(),
                  maxLengthValidation()
                )}
              />
              <ImageUpload fieldName="imgPath" />
            </form>
            <Button variant="contained" onClick={submit}>
              Add
            </Button>
            <Button variant="contained">Cancel</Button>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
