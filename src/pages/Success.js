import React, { useEffect } from 'react';
import axios from "axios";

function Success({  setCart, setItemsProductsData }) {

  let getNewCart = async () => {
    // get user data from local storage
    let userData = localStorage.getItem("store2-user");
    if (userData) {
      let userObj = JSON.parse(userData);
      let userId = userObj["store2UserId"];
      let userToken = userObj["store2Token"];

      // get new cart 
      let baseURL = "https://store2-backend.herokuapp.com"
      let getCartUrl = baseURL + "/api/carts/" + userId 
      console.log("get new cart url: ", getCartUrl)
    
      let reqHeaders = {
        headers:{
          "Accept": "application/json",
          Authorization: `Bearer ${userToken}`
        }
      }

      try {
        
        const res = await axios.get(getCartUrl, reqHeaders)
        console.log("res from get new cart: ", res)
        setCart(res.data[0]);
        setItemsProductsData(null);

      } catch (err) {
        if (err.response.data.message === "Unauthenticated."){
          localStorage.removeItem("store2-user")
        } else {
          console.log("error from Success.js useEffect: ", err)
        }
      } 

    }
  }

  // runs on first render 
  useEffect(() => {
    console.log("Success.js useEffect called");
    getNewCart();
    }, []);

  return (
    <div>The cart checkout session succeeded.</div>
  )
}

export default Success