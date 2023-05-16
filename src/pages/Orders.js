import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Orders({ currentToken, currentUserId }) {

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState();

  let baseURL = "https://store2-backend.herokuapp.com"
  

  let getOrders = async () => {
    let reqUrl = baseURL + "/api/orders_for_user/" + currentUserId
    let reqHeaders = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
    };
    let res = await axios.get(reqUrl, reqHeaders)
    console.log("res from get orders for user: ", res)
    // res.data is an array of order objects 
    setOrders(res.data)
  }

  // runs only on first render
  useEffect(() => {
    console.log("Order.js useEffect called")
    console.log("currentUserId: " + currentUserId)
    console.log("currentToken: " + currentToken)

    // THIS CAUSES A 401 ERROR - UNAUTHORIZED
    // THIS ALSO CAUSES A MESSAGE: UNAUTHENTICAED.
    getOrders()
    setIsLoading(false); 
  }, [currentToken, currentUserId]);

  return (
    <div>
      <div>Orders page here</div>
      { isLoading && <p>Loading...</p> }
      { orders && orders.map((obj) =>{
        <p>{JSON.stringify(obj)}</p>
      })}
    </div>
  )
}

export default Orders