// import { uuid } from 'uuidv4';

// best practice is to use beforeEach to do logins, cleanup 
// Cypress automatically clears all local storage before each test to prevent state from being shared across tests when test isolation is enabled.

describe('tests layout and functionality of cart page', () => {
  // let randomStrings = uuid().split("-")

  beforeEach(() => {
    cy.log("cart.cy.js before each running...")

    // login user
    cy.visit("http://localhost:3000/login")
    cy.get("[data-testid='login-email-field']").type("batman00@gmail.com")
    cy.get("[data-testid='login-password-field']").type("Green@55")
    cy.get("[data-testid='login-submit-button']").click() 
    
    // add item to cart 
    cy.get("[data-testid='all-products-link']").click()
  
    // this item is the coffee mug 
    cy.get("[data-testid='add-product-button']").eq(1).click() 

    // WHY ISN'T THIS INCREMENTING EACH TIME? 
    // I CAN INCREMENT IT IF I JUST OPEN IN LOCALHOST, BUT NOT HERE FROM CYPRESS 

    // logout 
    cy.get("[data-testid='logout-button']").click()
  })


  it('shows the current cart for a logged-inj', () => {
     // login user
     cy.visit("http://localhost:3000/login")
     cy.get("[data-testid='login-email-field']").type("batman00@gmail.com")
     cy.get("[data-testid='login-password-field']").type("Green@55")
     cy.get("[data-testid='login-submit-button']").click() 
 
     // click cart link 
     cy.get("[data-testid='cart-link']").click()
 
  })

})