import React from "react";
import { Link } from "react-router-dom";

function NavbarComponent({ currentUser, setCurrentUser }) {

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <br />
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default NavbarComponent;
