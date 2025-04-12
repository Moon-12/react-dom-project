import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { doc, onSnapshot } from "firebase/firestore";
import { fireStoreDB } from "../../../firebase/firebaseConfig";
import { setFlashcard } from "../../../redux/slice/flashcardSlice";

const ReactInterviewQuestions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const flashcardMetaDataDocRef = doc(
      fireStoreDB,
      "common",
      "flashcard-metadata"
    );
    const unsubscribe = onSnapshot(flashcardMetaDataDocRef, (snapShot) => {
      if (snapShot.exists()) {
        dispatch(setFlashcard({ flashcard: snapShot.data() }));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default ReactInterviewQuestions;
