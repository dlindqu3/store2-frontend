import React, { useEffect } from 'react';
import axios from "axios";

function Success({ cart, setCart, currentToken, setItemsProductsData }) {

  let getNewCart = async () => {

    let userData = localStorage.getItem("store2-user");
    if (userData) {
      let userObj = JSON.parse(userData);
      let userId = userObj["store2UserId"];
      // get new cart 
      let baseURL = "https://store2-backend.herokuapp.com"
      let getCartUrl = baseURL + "/api/carts/" + userId 

      console.log("get new cart url: ", getCartUrl)
    }
      // let reqHeaders = {
      //   headers:{
      //     "Accept": "application/json",
      //     Authorization: `Bearer ${currentToken}`
      //   }
      // }

      // try {
      //   const res = await axios.get(getCartUrl, reqHeaders)

      //   if (res.data[0] !== cart){
      //     // set state 
      //     setCart(res.data[0])
      //     setItemsProductsData(null);
      //   }

      // } catch (err) {
      //   if (err.response.data.message === "Unauthenticated."){
      //     localStorage.removeItem("store2-user")
      //   } else {
      //     console.log("error from Success.js useEffect: ", err)
      //   }
      // } 

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