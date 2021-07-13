import React, { useEffect } from "react";
import { useHistory } from "react-router";

const Logout = () => {
  let history = useHistory();
  useEffect(() => {
    localStorage.clear();
    history.push("/");
  }, [history]);
  return <></>;
};
export default Logout;
