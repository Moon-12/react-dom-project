import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import "./TextArea.css";
import { useFormContext } from "react-hook-form";
import { findFieldError, isEmptyObject } from "../formUtility";
import FieldError from "../FieldError/FieldError";
import { TextField } from "@mui/material";

const TextArea = ({ placeholder, maxRows, validators, fieldName }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findFieldError(errors, fieldName);

  return (
    <>
      {inputError.error && <FieldError message={inputError.error.message} />}
      <TextField
        multiline
        className="input-area"
        placeholder={placeholder}
        maxRows={maxRows}
        name={fieldName}
        error={!isEmptyObject(inputError)}
        {...register(fieldName, validators)}
      />
    </>
  );
};

export default TextArea;
