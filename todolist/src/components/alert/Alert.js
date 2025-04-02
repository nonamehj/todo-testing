import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import "./AlertStyle.css";
const Alert = () => {
  const {
    alert: { msg, type },
    showAlert,
  } = useGlobalContext();
  useEffect(() => {
    const timeout = setInterval(() => {
      showAlert();
    }, 1500);
    return () => clearInterval(timeout);
  });
  return (
    <div className={`alert alert-${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Alert;
