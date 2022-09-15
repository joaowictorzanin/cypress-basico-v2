Cypress._.times(5, () => {
  it('testa a página da política de privavidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
  })
})