import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"


function Register({ }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signupError, setSignupError] = useState("")
  const [displayPassword, setDisplayPassword] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate();

  const signup = async (username, email, password) => {

    let baseURL = "https://store2-backend.herokuapp.com"
    let queryUrl = baseURL + '/api/user/register'
    let createCartUrl = baseURL + "/api/carts"

    let reqBody = {
      username: username,
      email: email,
      password: password
    };

    let reqHeaders = {
      headers:{
        "Accept": "application/json"
    }
  }

    try {

      const res = await axios.post(queryUrl, reqBody, reqHeaders)
      // console.log("res.Data from signup: ", res.data) 

      let reqHeaders2 = {
        headers:{
          "Accept": "application/json",
          Authorization: `Bearer ${res.data.token}`
      }
    }

      // create new cart with new user's id 
      const res2 = await axios.post(createCartUrl, { "user_id": res.data.user.id }, reqHeaders2)
      // console.log("cart created res2.data: ", res2.data)

      // prove that new cart persists 
      let getCartURL = baseURL + "/api/carts/" + res.data.user.id
      const res3 = await axios.get(getCartURL, reqHeaders2) 
      // console.log("new cart data: ", res3.data[0])
      
      navigate("/login");

    } catch (error) {
        console.log(error)
        if (error.response.data.message){
          setSignupError(error.response.data.message)
        }
    }
  };

  const handlePasswordDisplay = async () => {
    if (displayPassword === true) {
      setDisplayPassword(false);
      setPasswordType("password");
    } else if (displayPassword === false) {
      setDisplayPassword(true);
      setPasswordType("text");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setSignupError("");
    if (password.length < 8){
      setSignupError("Please enter a password with at least 8 characters.")
    } else {
      let registrationData = await signup(username, email, password)
    }
    setIsLoading(false)
  };

  return (
    <div>
      <br />
      <br />
      <div >
        <div>
          <form onSubmit={handleSubmit}>
            <h4 >Register</h4> 
            <label >Username:</label>
            <div >
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </div>
            <label >Email:</label>
            <div >
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <label >Password:</label>
            <div>
              <input
                type={passwordType}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div >
              <input
                type="checkbox"
                onChange={() => {
                  handlePasswordDisplay();
                }}
              />
            <span >Show password</span>
              
            </div>

            <div >
              {signupError ? <p>**{signupError}</p> : <p></p>}
              {isLoading ? <p>Loading...</p> : <p></p>}
            </div>

            <div >
              <button >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;