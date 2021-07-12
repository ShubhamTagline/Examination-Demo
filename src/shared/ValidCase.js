import { emailReg } from "./OtherReuse";

export const handleCase = (name, value) => {
  switch (name) {
    case "email":
      if (!emailReg.test(value)) {
        return "Invalid Email";
      }
      break;

    case "password":
    case "oldPassword":
    case "ConfirmPassword":
      if (value.trim() === "") {
        return "*Required";
      }
      if (value.length < 7) {
        return `${name} is Too short`;
      }
      break;

    case "name":
    case "question":
    case "opt1":
    case "opt2":
    case "opt3":
    case "opt4":
    case "subjectName":
      if (value.trim() === "") {
        return `${name} is Required`;
      }
      break;

    case "role":
      if (value.length < 2) {
        return "Please Select Role";
      }
      break;

    default:
      break;
  }
};
