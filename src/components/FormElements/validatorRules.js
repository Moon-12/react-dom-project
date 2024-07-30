export const requiredValidation = (message = "required") => {
  return {
    required: {
      value: true,
      message: message,
    },
  };
};

export const maxLengthValidation = (maxLength = 200) => ({
  maxLength: {
    value: maxLength,
    message: `This field cannot exceed ${maxLength} characters`,
  },
});

export const combineValidators = (...validators) => {
  return validators.reduce((acc, validator) => {
    return { ...acc, ...validator };
  }, {});
};
