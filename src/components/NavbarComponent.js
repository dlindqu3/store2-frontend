import React from "react";
import { Link } from "react-router-dom";

function NavbarComponent({ currentUsername, setCurrentUsername }) {

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        { currentUsername ? <p>{currentUsername}</p> : <p></p> } 
      </div>
    </div>
  );
}

export default NavbarComponent;
