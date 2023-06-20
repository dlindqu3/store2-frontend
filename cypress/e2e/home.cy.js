
describe('tests layout and functionality of Home page', () => {
  it('contains an h2 with the correct text', () => {
    cy.visit("http://localhost:3000")
    cy.get("[data-testid='headerTestId']").contains("Home")
  })

  // to get a specific item from an array on screen: 
  // Since we are getting back an array, we can use a Cypress command called eq.
  // this "eq" can be used to get an array item at a SPECIFIC index
  it('confirms the first displayed card has the given product description text', () => {
    cy.visit("http://localhost:3000")
    // get first product's description
    // this should be the item with the description "This ukulele sounds wonderful."
    cy.get("[data-testid='product-description']").eq(0).contains("This ukulele sounds wonderful.")
  })

  // confirm an item is in an array of values on screen
  // FIX 
  it('confirms that the given product description is one of those displayed', () => {
    cy.visit("http://localhost:3000")
    let description = "Six piece drum set."
  
    cy.get("[data-testid='product-description']")
      .then($els => {
        return Array.from($els, el => el.innerText);
      })
      .should('include', description)
  })  

  it('confirms that the given product description is NOT one of those displayed', () => {
    cy.visit("http://localhost:3000")
    let description = "This is an excellent jacket for sub-zero temperatures."
  
    cy.get("[data-testid='product-description']")
      .then($els => {
        return Array.from($els, el => el.innerText);
      })
      .should('not.include', description)
  })  

})

