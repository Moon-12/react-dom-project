import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { isEmptyObject, findFieldError } from "../formUtility";
import FieldError from "../FieldError/FieldError";

const AutoCompleteInput = ({ fieldName, validators }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const flashcard = useSelector((state) => state.flashcardReducer.flashcard);
  const defaultTopics = Object.keys(flashcard);
  const inputError = findFieldError(errors, fieldName);

  return (
    <>
      {inputError.error && <FieldError message={inputError.error.message} />}
      <Controller
        name={fieldName}
        control={control}
        rules={validators}
        render={({ field: { onChange, value, ref } }) => (
          <Autocomplete
            id="combo-box-demo"
            options={defaultTopics}
            freeSolo
            value={value || ""}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Topic"
                inputRef={ref}
                error={!isEmptyObject(inputError)}
              />
            )}
          />
        )}
      />
    </>
  );
};

export default AutoCompleteInput;
