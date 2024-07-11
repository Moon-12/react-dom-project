import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { fireStoreDB } from "../../../../../firebase/firebaseConfig";
import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

const MillionCheckboxes = () => {
  const [checkboxMetadata, setCheckboxMetadata] = useState({});
  const checkboxMetaDataDocRef = doc(
    fireStoreDB,
    "common",
    "checkbox-metadata"
  );
  useEffect(() => {
    onSnapshot(checkboxMetaDataDocRef, (snapShot) => {
      if (snapShot.exists()) {
        setCheckboxMetadata(snapShot.data());
      }
    });
  }, []);

  const handleChangeCheckbox = async (e) => {
    const targetCheckboxID = e.target.id;
    getDoc(checkboxMetaDataDocRef)
      .then((docSnap) => {
        if (docSnap.data()) {
          const isChecked = docSnap.data()[targetCheckboxID];
          updateDoc(checkboxMetaDataDocRef, {
            [targetCheckboxID]: !isChecked,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <>
      {Object.keys(checkboxMetadata)
        .sort()
        .map((checkboxID) => {
          return (
            <Checkbox
              key={checkboxID}
              id={checkboxID}
              checked={checkboxMetadata[checkboxID]}
              onChange={handleChangeCheckbox}
            />
          );
        })}
    </>
  );
};
export default MillionCheckboxes;
