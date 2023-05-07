import React from 'react'

function CartItem({ itemProductObj }) {
  return (
    <div>
        <div>CartItem</div>
        <p>{JSON.stringify(itemProductObj)}</p>
    </div>
  )
}

export default CartItem