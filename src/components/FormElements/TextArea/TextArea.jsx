import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import "./TextArea.css";
import { useFormContext } from "react-hook-form";
import { findFieldError, isEmptyObject } from "../formUtility";
import FieldError from "../FieldError/FieldError";

const TextArea = ({ placeholder, minRows, validators, fieldName }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findFieldError(errors, fieldName);

  return (
    <>
      {inputError.error && <FieldError message={inputError.error.message} />}
      <Textarea
        className="input-area"
        placeholder={placeholder}
        minRows={minRows}
        name={fieldName}
        error={!isEmptyObject(inputError)}
        {...register(fieldName, validators)}
      />
    </>
  );
};

export default TextArea;
