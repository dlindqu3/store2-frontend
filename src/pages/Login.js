import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"


function Login ({ setCurrentUsername, setCurrentToken, setCurrentUserEmail, setCurrentUserId, setCart }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [displayPassword, setDisplayPassword] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate();

  const login = async (email, password) => {
    let baseURL = "https://store2-backend.herokuapp.com"
    let loginUrl = baseURL + "/api/user/login"

    let getCartUrl = baseURL + "/api/carts/"

    let reqBody = {
      email: email,
      password: password
    };

    let reqHeaders = {
      headers:{
        "Accept": "application/json"
      }
    }
    

    try {

      
        const res = await axios.post(loginUrl, reqBody, reqHeaders)
        console.log("res.data: ", res.data) 
        
        let store2User = {
            store2Email: res.data.user.email,
            store2Username: res.data.user.username,
            store2Token: res.data.token, 
            store2UserId: res.data.user.id
        }

        let req2Url = getCartUrl + res.data.user.id

        let reqHeaders2 = {
          headers:{
            "Accept": "application/json",
            Authorization: `Bearer ${res.data.token}`
        }
      }

        // get cart for this user
        let res2 = await axios.get(req2Url, reqHeaders2)
        console.log("res2 cart: ", res2)
        console.log("cart data: ", res2.data[0]) 

        localStorage.setItem("store2-user", JSON.stringify(store2User))
        console.log(localStorage.getItem("store2-user"))
        
        setCurrentUserEmail(store2User["store2Email"])
        setCurrentUsername(store2User["store2Username"])
        setCurrentToken(store2User["store2Token"])
        setCurrentUserId(store2User["store2UserId"])
        setCart(res2.data[0])
      
        navigate("/all-products")
        
    } catch (error) {
      if (error.response.data.message){
        setLoginError(error.response.data.message)
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
    // console.log('login handleSubmit called')
    setIsLoading(true)
    setLoginError("");
    login(email, password)
    setIsLoading(false)
  };

  return (
    <div>
      <br />
      <br />
      <div >
        <div>
          <form onSubmit={handleSubmit}>
            <h4 >Login </h4>
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
              {displayPassword && <span >Hide password</span>}
              {!displayPassword && <span >Show password</span>}
            </div>

            <div >
              {loginError ? <p>**{loginError}</p> : <p></p>}
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

export default Login;