import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { findFieldError } from "../../utils/findFieldError";
import { isFormInvalid } from "../../utils/isFormValid";

const Select = ({ name, options, rules }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findFieldError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);
  return (
    <>
      {isInvalid && <FieldError message={inputErrors.error.message} />}
      <div>
        <Controller
          name={name}
          control={control}
          rules={rules.validation}
          render={({ field }) => (
            <select {...field} defaultValue="">
              <option value="" disabled>
                -- Select an option --
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    </>
  );
};

const FieldError = ({ message }) => {
  return <div> {message}</div>;
};

export default Select;
