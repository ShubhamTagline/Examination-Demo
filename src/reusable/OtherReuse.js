/* eslint-disable */

export const ButtonField = ({ variant, type, value ,...props}) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {value}
    </button>
  );
};

export const validateForm = (errors) => {
  let valid = true;
  errors &&
    Object.values(errors).some((val) => val.length > 0 && (valid = false));
  return valid;
};

export const validName = (value) => {
  if (value.trim() === "") {
    return "*Required";
  }
  if (value.length < 2) {
    return "Name is Too Short";
  }
  return "";
};

export const validEmail = (value) => {
  const emailReg =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!emailReg.test(value)) {
    return "Invalid Email";
  }
  return "";
};

export const validPassword = (value) => {
  if (value.trim() === "") {
    return "*Required";
  }
  if(value.length < 7){
    return "Password is Too short"
  }
  return "";
};

export const validRole =(value)=>{
  if(value.length < 2){
    return "Please Select Role"
  }
  return ""
}

export const alertMsg=()=>{
  return alert("Please fill proper form");
}

export const localGet = (val) => {
   return localStorage.getItem(val);
 };