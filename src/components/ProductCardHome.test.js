import ProductCardHome from "./ProductCardHome";
import { render, screen } from '@testing-library/react';
import { products } from "../mocks/responses";
import '@testing-library/jest-dom'

// testing with fake data passed in, without using mock service workers/api calls
test("should show a card for product bike1 with given description", () => {
    render ( <ProductCardHome productData={products[1]} /> )
    const element = screen.getByTestId("product-description");
    expect(element).toHaveTextContent("This bike is great."); 
})

// testing with fake data passed in, without using mock service workers/api calls
test("should show a card for product bike1 with given image", () => {
  render ( <ProductCardHome productData={products[1]} /> )
  const element = screen.getByTestId("product-image");
  expect(element).toBeInTheDocument(); 
})

