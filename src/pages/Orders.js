import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Orders({ currentToken, currentUserId }) {

  const [isLoading, setIsLoading] = useState(true);
  const [noOrdersText, setNoOrdersText] = useState(true);
  const [orders, setOrders] = useState();

  let baseURL = "https://store2-backend.herokuapp.com"

  let reqHeaders = {
    headers:{
      "Accept": "application/json",
      Authorization: `Bearer ${currentToken}`
    }
  }

  let getOrders = async () => {
    let reqUrl = baseURL + "/api/orders_for_user/" + currentUserId

    let res = await axios.get(reqUrl, reqHeaders)
    console.log("res from get orders for user: ", res)
    // res.data is an array of order objects 
    setOrders(res.data)

    if (res.data.length > 0){ 
      setNoOrdersText(false); 
    }
    return res.data
  }

let getOrderItems = async (ordersArr) => {

  let resObj = {}

  for (let i=0; i < ordersArr.length; i++){
    let currentOrder = ordersArr[i];
    let currentOrderCost = currentOrder.total_cost
    let currentOrderTime = currentOrder.created_at

    resObj[i] = {}
    resObj[i]["totalCost"] = currentOrderCost
    resObj[i]["time"] = currentOrderTime 

    let reqUrl = baseURL + "/api/order_items_for_order"
    let reqBody = {
      "order_id": currentOrder.id
    }
    let res = axios.get(reqUrl, reqBody, reqHeaders)
    console.log("order items for order: ", res.data)
    resObj[i]["items"] = res.data
  }

  console.log("resObj from getOrderItems: ", resObj)

}

  // runs only on first render
  useEffect(() => {
    console.log("Order.js useEffect called")
    let ordersArr = [];
    ordersArr = getOrders()
    if (ordersArr.length > 0){
      getOrderItems(ordersArr)
    }
    setIsLoading(false); 
  }, []);

  return (
    <div>
      <div>Orders page here</div>
      { noOrdersText && <p>You have not made any orders.</p> }
      { isLoading ? <p>Loading...</p>: <p></p> }

      { orders && console.log("orders state: ", orders) }
      { orders && <p>Orders: </p> }
      { orders && orders.map((obj) =>{
        return <p key={obj.id}>{obj["total_cost"]}</p>
      }) }


    </div>
  )
}

export default Orders