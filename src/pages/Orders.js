import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Orders({ currentToken, currentUserId }) {

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState();

  let baseURL = "https://store2-backend.herokuapp.com"
  

  let getOrders = async () => {
    let reqUrl = baseURL + "/api/orders"
    let reqBody = { "user_id": currentUserId }
    let reqHeaders = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
    };
    let res = await axios.get(reqUrl, reqBody, reqHeaders)
    console.log("res from get orders for user: ", res)
  }

  // runs only on first render
  useEffect(() => {
    console.log("Order.js useEffect called")
    console.log("currentUserId: " + currentUserId)
    console.log("currentToken: " + currentToken)
    getOrders()
    setIsLoading(false); 
  }, [currentToken, currentUserId]);

  return (
    <div>
      <div>Orders page here</div>
      { isLoading && <p>Loading...</p> }
    </div>
  )
}

export default Orders