import React from 'react'

function CartItem({ itemProductObj }) {


  return (
    <div>
        <div style={{ height: "2px", background: "black", marginLeft: "20px", marginRight: "20px", marginBottom: "5px" }}></div>
        <div style={{ height: "2px", background: "black", marginLeft: "30px", marginRight: "30px", marginBottom: "5px" }}></div>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "20px" }}>
          <div>
            <img src={itemProductObj.product_item.image} alt={itemProductObj.product_item.name} width="200px" /> 
          </div>
          <div>
            <h5 style={{ display: "flex", flexWrap: "wrap", marginLeft: "15px", fontWeight: "bold" }}>{itemProductObj.product_item.brand}: {itemProductObj.product_item.name}</h5>
            <p style={{ marginLeft: "15px" }} >{itemProductObj.product_item.description}</p>
            <ul style={{ display: "flex", flexWrap: "wrap" }}>
              <li style={{ marginLeft: "15px", marginRight: "10px" }} >Unit price: {itemProductObj.product_item.price}</li>
              <li style={{ marginLeft: "15px" }} >Quantity: {itemProductObj.cart_item.quantity}</li>
            </ul>
            {/* {console.log("itemProductObj: ", itemProductObj)} */}
          </div>
        </div>
        {/* <p>{JSON.stringify(itemProductObj)}</p> */}
    </div>
  )
}

export default CartItem