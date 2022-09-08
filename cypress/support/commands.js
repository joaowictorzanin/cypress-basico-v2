Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste.'
  cy.get('#firstName').type('João').should('have.value', 'João')
  cy.get('#lastName').type('Zanin').should('have.value', 'Zanin')
  cy.get('#email').type('jwzanin@gmail.com').should('have.value', 'jwzanin@gmail.com')
  cy.get('#phone').type('51992693011').should('have.value', '51992693011')
  cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText)
  cy.get('button[type="submit"]').click()
})