describe('tests layout and functionality of all-products page', () => {
  it('renders the login component at /all-products if there is no currentUsername in app state', () => {
    cy.visit('http://localhost:3000/all-products')
    // with no currentUsername in app state, renders Login component at the /all-products route
    cy.get("[data-testid='login-email-field']").should('exist')
  })

  it('renders a list of product cards if there is a currentUsername in app state', () => {
    cy.visit('http://localhost:3000/login')
    // first, login 
    cy.get("[data-testid='login-email-field']").type("batman85@gmail.com")
    cy.get("[data-testid='login-password-field']").type("Green@55")
    cy.get("[data-testid='login-submit-button']").click() 
    // then, access protected route /all-products 
    // on this new page, there should be one data-testid of product-description for each displayed product Cart 
    cy.get("[data-testid='all-products-product-description']").should('exist')
  })
    
  // this proves that the logged-in user's state from the previous test does not persist. GOOD.
  it('renders the login component at /all-products if there is no currentUsername in app state', () => {
    cy.visit('http://localhost:3000/all-products')
    // with no currentUsername in app state, renders Login component at the /all-products route
    cy.get("[data-testid='login-email-field']").should('exist')
  })

})