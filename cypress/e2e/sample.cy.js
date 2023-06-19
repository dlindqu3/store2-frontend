

// results for each test display in the "Cypress Test Runner" page
describe('My first and second tests', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  });

  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
  });

  // this page contains the word "type"
  it('finds the content "type"', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type')
  });

    // the page does not contain the word "hype", so this test would fail
    // Can you see what Cypress is doing under the hood? 
    // It's automatically waiting and retrying because it expects the content to eventually be found in the DOM. 
    // It doesn't immediately fail!
    // it('finds the content "hype"', () => {
    //   cy.visit('https://example.cypress.io')
    //   cy.contains('hype')
    // });

    // You can almost read it like a little story! 
    // Cypress calls this "chaining" and we chain together commands to build tests that really express what the app does in a declarative way.
    it('clicks the link "type"', () => {
      cy.visit('https://example.cypress.io')
  
      cy.contains('type').click()
    });

    it('clicking "type" navigates to a new url', () => {
      cy.visit('https://example.cypress.io')
  
      cy.contains('type').click()
  
      // Should be on a new URL which
      // includes '/commands/actions'
      // url after click: https://example.cypress.io/commands/actions
      cy.url().should('include', '/commands/actions')
    })

    // We can use cy.get() to select an element based on its class.
    // Then we can use the .type() command to enter text into the selected input. 
    // Finally, we can verify that the value of the input reflects the text that was typed with another .should().
    // In general, the structure of your test should flow query -> query -> command or assertion(s). 
    // It's best practice not to chain anything after an action command.
    it('Gets, types and asserts', () => {
      cy.visit('https://example.cypress.io')
  
      cy.contains('type').click()
  
      // Should be on a new URL which
      // includes '/commands/actions'
      cy.url().should('include', '/commands/actions')
  
      // Get an input, type into it
      cy.get('.action-email').type('fake@email.com')
  
      //  Verify that the value has been updated
      cy.get('.action-email').should('have.value', 'fake@email.com')
    })

    // We normally don't suggest selecting and finding elements by their class names.
    // better option, select by data-cy, data-test, or data-testid value: 
      // <button id="main" class="btn btn-large" data-cy="submit">
      //   Submit
      // </button>
    // use: cy.get('[data-cy="submit"]').click()

})