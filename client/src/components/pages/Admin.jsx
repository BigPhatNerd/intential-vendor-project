import React, { useEffect, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";

const Admin = () => {
  const registrationContext = useContext(RegistrationContext);
  const { admin, logout } = registrationContext;
  console.log({ registrationContext });
  const handleLogoutClick = () => {
    logout(); // Calling the logout function from your context
    // You can add more actions here if needed after logging out, like redirecting the user
  };
  if (!admin.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div>Admin</div>
      <button onClick={handleLogoutClick} className="btn btn-danger">
        Logout
      </button>
      <div>
        <p>
          Return to the <Link to="/">vending machine</Link>.
        </p>
      </div>
    </>
  );
};

export default Admin;
