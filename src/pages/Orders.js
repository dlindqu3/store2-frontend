import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Orders({ currentToken, currentUserId }) {

  const [isLoading, setIsLoading] = useState(true);
  const [noOrdersText, setNoOrdersText] = useState(true);
  const [orders, setOrders] = useState();

  let baseURL = "https://store2-backend.herokuapp.com"

  let reqHeaders = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${currentToken}`,
    },
  };

  let getOrders = async () => {
    let reqUrl = baseURL + "/api/orders_for_user/" + currentUserId

    let res = await axios.get(reqUrl, reqHeaders)
    console.log("res from get orders for user: ", res)
    // res.data is an array of order objects 
    setOrders(res.data)

    if (res.data.length > 0){ 
      setNoOrdersText(false); 
    }
  }

  // runs only on first render
  useEffect(() => {
    console.log("Order.js useEffect called")
    // THIS CAUSES A 401 ERROR - UNAUTHORIZED
    // THIS ALSO CAUSES A MESSAGE: UNAUTHENTICAED.
    getOrders()
    setIsLoading(false); 
  }, []);

  return (
    <div>
      <div>Orders page here</div>
      { noOrdersText && <p>You have not made any orders.</p> }
      { isLoading ? <p>Loading...</p>: <p></p> }

      { orders && console.log("orders state: ", orders) }
      { orders && orders.map((obj) =>{
        <p key={obj.id}>{obj["total_cost"]}</p>
      }) }
    </div>
  )
}

export default Orders