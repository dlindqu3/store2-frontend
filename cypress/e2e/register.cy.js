import { uuid } from 'uuidv4';


describe('tests layout and functionality of Register page', () => {
  it('contains an input field with correct data-testid', () => {
    cy.visit("http://localhost:3000/register")
    cy.get("[data-testid='username-field']").should('exist')
  })

  it('does not contain a paragraph with error text at initial page load', () => {
    cy.visit("http://localhost:3000/register")
    cy.get("[data-testid='signup-error']").should('not.exist')
  })

  it('contains a paragraph with correct error text if password too short', () => {
    cy.visit("http://localhost:3000/register")
    cy.get("[data-testid='username-field']").type('batman75')
    cy.get("[data-testid='email-field']").type('batman75@gmail.com')
    cy.get("[data-testid='password-field']").type('gotham')
    cy.get("[data-testid='submit-button']").click()
    cy.get("[data-testid='signup-error']").contains('**Please enter a password with at least 8 characters.')
  })

  it('should redirect to login route after successful registration', () => {
    cy.visit("http://localhost:3000/register")
    
    let randomStrings = uuid().split("-")
    // randomStrings before split is like: 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed

    cy.get("[data-testid='username-field']").type(randomStrings[0])
    cy.get("[data-testid='email-field']").type(`${randomStrings[1]}@gmail.com`)
    cy.get("[data-testid='password-field']").type(`gotham@${randomStrings[2]}`)
    cy.get("[data-testid='submit-button']").click() 
    cy.url().should('include', '/login')

    // sends POST request to url: https://store2-backend.herokuapp.com/api/user/register
    // redirects  to /login if registration is successful 
  })

  // sample registered user: 
  // username: batman85
  // email: batman85@gmail.com
  // password: Green@55

})