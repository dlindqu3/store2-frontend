import React, { useEffect } from 'react'
import axios from 'axios';

function Orders({ }) {

  let baseURL = "https://store2-backend.herokuapp.com"
  

  let getOrders = async (token, userId) => {
    let reqUrl = baseURL + "/api/orders_for_user"
    let reqBody = { "user_id": userId }
    let reqHeaders = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let res = await axios.get(reqUrl, reqBody, reqHeaders)
    console.log("res from get orders for user: ", res)
  }

  // runs only on first render
  // passing currentUserId and currentToken through props is TOO SLOW
  useEffect(() => {
    let user = localStorage.getItem("store2-user")
    let userId = user["store2UserId"]
    let token = user["store2Token"]
    console.log("Order.js useEffect called")
    console.log("current user id: " + userId)
    console.log("current user token: " + token)
    getOrders(token, userId)
  }, []);

  return (
    <div>Orders page here</div>
  )
}

export default Orders