import ProductCardHome from "./ProductCardHome";
import { render, screen } from '@testing-library/react';
import CartItem from "./CartItem";
import '@testing-library/jest-dom'

// testing with fake data passed in, without using mock service workers/api calls
test("should show a cart item with given description.", async () => {
    let itemProductObj1 = {
        "cart_item": { "id": 110, "cart_id": 100, "product_id": 2, "quantity": 2 },
        "product_item": { "brand": "Kroger", "category": "kitchenware", "description": "This is a great mug.", "id": 2, "image": "/images/coffeeMug.jpg", "name": "coffe mug", "price": 15, "slug": "coffee-mug" }, 
        "user_email": "batman@gmail.com"

    }
    render ( <CartItem itemProductObj={itemProductObj1} /> )
    const element = await screen.findByTestId("cart-item-description");
    expect(element).toHaveTextContent("This is a great mug."); 
})