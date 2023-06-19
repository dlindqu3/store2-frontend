
// run app in one terminal, cypress in another (can create multiple terminals in vs code)

describe('template spec', () => {
  it('contains an h2 with the correct text', () => {
    cy.visit("http://localhost:3000")
    cy.get("[data-testid='headerTestId']").contains("Home")
  })

  // to get a specific item from an array on screen: 
  // Since we are getting back an array, we can use a Cypress command called eq.
  // this "eq" can be used to get an array item at a SPECIFIC index
  it('contains a card with the given product description text', () => {
    cy.visit("http://localhost:3000")
    // get first product's description
    // this should be the item with the description "This ukulele sounds wonderful."
    cy.get("[data-testid='product-description']").eq(0).contains("This ukulele sounds wonderful.")
  })
})