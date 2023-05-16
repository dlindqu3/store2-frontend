import React, { useEffect } from 'react'
import axios from 'axios';

function Orders({ currentUserId, currentToken }) {

  let baseURL = "https://store2-backend.herokuapp.com"
  
  let reqHeaders = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${currentToken}`,
    },
  };


  let getOrders = async () => {
    let reqUrl = baseURL + "/api/orders_for_user"
    let reqBody = { "user_id": currentUserId }
    let res = await axios.get(reqUrl, reqBody, reqHeaders)
    console.log("res from get orders for user: ", res)
  }

  // runs only on first render
  useEffect(() => {
    console.log("Order.js useEffect called")
    console.log("current user id: " + currentUserId)
    console.log("current user token: " + currentToken)
    getOrders()
  }, []);

  return (
    <div>Orders page here</div>
  )
}

export default Orders