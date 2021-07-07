import { validEmail, validName, validPassword, validRole } from "./OtherReuse";

export const handleCase = (name, value, errors) => {
  console.log(`name`, name);
  switch (name) {
    case "email":
      return (errors[name] = validEmail(value));

    case "password" , "Password" || "oldPassword" || "ConfirmPassword": //find solution for this
      return <>{console.log(`${name} Execute`)}{errors[name] = validPassword(value,name)}</>;
    case "name":
      return (errors.name = validName(value, name));

    case "role":
      return (errors.role = validRole(value));

    default:
      break;
  }
};
