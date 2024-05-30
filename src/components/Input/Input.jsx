import { useFormContext } from "react-hook-form";
import { findFieldError } from "../../utils/findFieldError";
import { isFormInvalid } from "../../utils/isFormValid";

const Input = ({ type, placeholder, name, inpValidation, defaultValue }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findFieldError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <>
      {isInvalid && <FieldError message={inputErrors.error.message} />}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        {...register(
          name,
          inpValidation.validation
          // type === "password"
          //   ? inpValidation.validation.required
          //   : inpValidation.validation
        )}
        value={defaultValue}
      />
    </>
  );
};

export default Input;

const FieldError = ({ message }) => {
  return <div> {message}</div>;
};
