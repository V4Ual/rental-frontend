import {
  loginAuth,
  emailValidation,
  otpValidation,
} from "../validation/auth/SignupValidation";

export const Validator = (authFunction, data, setErrorMessage, name) => {
  const result = authFunction.validate(data, { abortEarly: true });
  if (result.error) {
    if (result.error.message.length > 0) {
      setErrorMessage((previous) => ({
        ...previous,
        [name]: result.error.message.length > 0 ? result.error.message : "",
      }));
    }
  } else {
    setErrorMessage((previous) => ({
      ...previous,
      [name]: "",
    }));
  }
};

export const validationSubmit = (authFunction, data) => {
  const { error } = authFunction.validate(data, { abortEarly: false });
  const validationObject = {};
  error?.details.map((detail) => {
    validationObject[detail.path[0]] = detail.message;
  });
  
  return validationObject
};
