import { validEmailPattern } from "../../../utilities/formUtilities";

export const validateEmail = (email) => {
  return email?.match(validEmailPattern);
};
