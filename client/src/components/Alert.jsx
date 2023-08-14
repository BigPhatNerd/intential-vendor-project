import { useContext } from "react";
import RegistrationContext from "../context/registration/registrationContext";

const Alert = () => {
  const registrationContext = useContext(RegistrationContext);

  const { alert } = registrationContext;

  return (
    alert !== null &&
    alert.length !== 0 &&
    alert.map((item, i) => (
      <div
        key={`alert-${i}`}
        style={{
          backgroundColor: "blue",
          color: "white",
          position: "fixed",
          width: "100%",
          zIndex: 1,
          height: "3rem",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1rem",
        }}
      >
        {item.msg}
      </div>
    ))
  );
};

export default Alert;
