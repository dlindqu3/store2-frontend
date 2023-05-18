import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function Orders({ currentToken, currentUserId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ordersData, setOrdersData] = useState(null);

  let baseURL = "https://store2-backend.herokuapp.com";

  let reqHeaders = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${currentToken}`,
    },
  };

  let getOrdersAndItems = async () => {
    // WORKS
    // 1. get all orders for user
    let reqUrl1 = baseURL + "/api/orders_for_user/" + currentUserId;
    let res = await axios.get(reqUrl1, reqHeaders);
    // console.log("orders for user: ", res.data);
    let orders = res.data;

    // DOESN'T WORK
    // 2. get all order_items for user
    let orderItems = [];
    for (let i = 0; i < orders.length; i++) {
      let currentOrder = orders[i];
      let reqUrl2 = baseURL + "/api/order_items_for_order/" + currentOrder.id;
      let res2 = await axios.get(reqUrl2, reqHeaders);
      // console.log("res2 order items for order: ", res2.data);
      for (let j = 0; j < res2.data.length; j++) {
        orderItems.push(res2.data[j]);
      }
    }
    // console.log("all orderItems for user: ", orderItems);

    // NEW
    // 3. get all unique product_ids for user
    let uniqueProductIds = [];
    for (let j = 0; j < orderItems.length; j++) {
      let currentOrderItem = orderItems[j];
      if (!uniqueProductIds.includes(currentOrderItem.product_id)) {
        uniqueProductIds.push(currentOrderItem.product_id);
      }
    }
    // console.log("unique products bought: ", uniqueProductIds);

    // // 4. get product items with uniqueProductIds array
    let reqUrl3 = baseURL + "/api/products/filter";
    let reqBody3 = { productIds: uniqueProductIds };
    let res3 = await axios.post(reqUrl3, reqBody3, reqHeaders);
    let filteredProducts = res3.data;
    // console.log("filtered products: ", filteredProducts);

    // // 5. start empty ARRAY
    let resArray = [];

    // // 6. add OBJECT for each order to ARRAY
    for (let i = 0; i < orders.length; i++) {
      resArray.push({
        orderId: orders[i]["id"],
        time: orders[i]["created_at"],
        totalCost: orders[i]["total_cost"],
        productsAndQuants: [],
      });
    }

    // // 7. add OBJ to productsAndQuants for each product/orderItem with name, quantity
    for (let i = 0; i < resArray.length; i++) {
      let currentOrder = resArray[i];
      let currentOrderId = currentOrder.orderId;

      let filteredItems = [];
      for (let k = 0; k < orderItems.length; k++) {
        if (orderItems[k].order_id === currentOrderId) {
          filteredItems.push(orderItems[k]);
        }
      }

      for (let j = 0; j < filteredItems.length; j++) {
        let currentItem = filteredItems[j];
        // console.log("current filtered order item: ", currentItem);
        let productQuant = {};
        let currentItemProdId = currentItem.product_id;
        for (let k = 0; k < filteredProducts.length; k++) {
          let currentProduct = filteredProducts[k];
          if (currentItemProdId === currentProduct.id) {
            productQuant["name"] = currentProduct["name"];
            productQuant["quantity"] = currentItem["quantity"];
            // console.log("finished productQuant item: ", productQuant);
            currentOrder["productsAndQuants"].push(productQuant);
          }
        }
      }
    }

    // console.log("resArray from getOrdersAndItems: ", resArray);

    // 8. setState with ARRAY
    setOrdersData(resArray);
  };

  // runs only on first render
  useEffect(() => {
    console.log("Order.js useEffect called");
    getOrdersAndItems();
    setIsLoading(false);
  }, []);

  // display order date, total cost, each product name, and quantity for each product

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Orders</h3>
      { ordersData && ordersData.length === 0 && <p>You have not made any orders.</p> }
      {isLoading ? <p>Loading...</p> : <p></p>}

      {/* {console.log("ordersData 1: ", ordersData)} */}

      {/* {ordersData && ordersData.length > 0 && console.log("ordersData: ", ordersData)} */}

      {ordersData && ordersData.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Products</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {ordersData &&
              ordersData.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{ordersData.indexOf(order) + 1}</td>
                    <td>{order.time}</td>
                    <td>
                      {order.productsAndQuants.map((product) => {
                        return (
                          <p key={product.name}>
                            {product.name} x {product.quantity}
                          </p>
                        );
                      })}
                    </td>
                    <td>${order.totalCost}.00</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}

    </div>
  );
}

export default Orders;
