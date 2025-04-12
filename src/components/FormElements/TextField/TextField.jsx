import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import { findFieldError, isEmptyObject } from "../formUtility";
import FieldError from "../FieldError/FieldError";

const TextFieldInput = ({ placeholder, validators, fieldName }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findFieldError(errors, fieldName);
  return (
    <>
      {inputError.error && <FieldError message={inputError.error.message} />}
      <TextField
        error={!isEmptyObject(inputError)}
        placeholder={placeholder}
        name={fieldName}
        {...register(fieldName, validators)}
      />
    </>
  );
};

export default TextFieldInput;
