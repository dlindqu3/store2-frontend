describe('tests layout and functionality of Login page', () => {
  
  it('contains an input field with correct data-testid', () => {
    cy.visit("http://localhost:3000/login")
    cy.get("[data-testid='login-email-field']").should('exist')
  })

  it('does not contain a paragraph with error text at initial page load', () => {
    cy.visit("http://localhost:3000/login")
    cy.get("[data-testid='login-error']").should('not.exist')
  })

  it('contains a paragraph with correct error text if email not registered', () => {
    cy.visit("http://localhost:3000/login")
    // this email has not been registered as a user
    cy.get("[data-testid='login-email-field']").type('robin75499@gmail.com')
    cy.get("[data-testid='login-password-field']").type('gotham#75')
    cy.get("[data-testid='login-submit-button']").click()
    cy.get("[data-testid='login-error']").contains('**Please try again with a valid email and password.')
  })

  it('contains a paragraph with correct error text if password not correct', () => {
    cy.visit("http://localhost:3000/login")
    // this email/user exists 
    cy.get("[data-testid='login-email-field']").type('batman85@gmail.com')
    // this is not the correct password for that user 
    cy.get("[data-testid='login-password-field']").type('Gotham@85')
    cy.get("[data-testid='login-submit-button']").click()
    cy.get("[data-testid='login-error']").contains('**Please try again with a valid email and password.')
  })

  it('should redirect to products route after successful login', () => {
    cy.visit("http://localhost:3000/login")
    cy.get("[data-testid='login-email-field']").type("batman85@gmail.com")
    cy.get("[data-testid='login-password-field']").type("Green@55")
    cy.get("[data-testid='login-submit-button']").click() 
    cy.url().should('include', '/all-products')
    // sends POST request to url: https://store2-backend.herokuapp.com/api/user/login
    // redirects  to /all-products if login is successful 
  })
})