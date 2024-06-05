const requiredValidation = {
  required: {
    value: true,
    message: "required",
  },
};

// let minlegthValidator = (size) => {
//   return {
//     minLength: {
//       value: size,
//       message: `min ${size} characters`,
//     },
//   };
// };

const passwordPatternValidation = {
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
    message:
      "Password must contain at least one uppercase letter and one special character",
  },
};

export const validators = {
  freeTextValidation: {
    validation: {
      ...requiredValidation,
      maxLength: {
        value: 30,
        message: "30 characters max",
      },
    },
  },
  passwordTextValidation: {
    validation: {
      ...requiredValidation,
    },
  },

  signUpPasswordValidation: {
    validation: {
      ...requiredValidation,
      ...passwordPatternValidation,
      minLength: {
        value: 8,
        message: "min 8 characters",
      },
    },
  },
  confirmPasswordTextValidation: {
    validation: {
      required: "Please confirm your password",
      validate: (value, { password }) =>
        value === password || "Passwords do not match",
    },
  },
  dropdownValidation: {
    validation: {
      ...requiredValidation,
    },
  },
};
