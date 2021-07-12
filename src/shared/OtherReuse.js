/* eslint-disable */
export const ButtonField = ({
  variant,
  type,
  value,
  disable,
  cursorPoint,
  ...props
}) => {
  return (
    <button
      className={variant ? `btn btn-${variant}` : "btn btn-primary"}
      disabled={disable}
      style={
        cursorPoint && { ...{ cursor: "not-allowed", pointerEvents: "all" } }
      }
      {...props}
    >
      {value}
    </button>
  );
};

export const validateForm = (errors) => {
  let valid = true;
  errors &&
    Object.values(errors).some(
      (val) => val && val.length > 0 && (valid = false)
    );
  return valid;
};

export const validateFormNext = (errors) => {
  let valid = true;
  errors &&
    Object.values(errors).some((val) => val.length > 2 && (valid = false));
  return valid;
};

export const emailReg =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const alertMsg = () => {
  return alert("Please fill proper form");
};

export const localGet = (val) => {
  return localStorage.getItem(val);
};

export const localSet = (title, value) => {
  return localStorage.setItem(title, value);
};
