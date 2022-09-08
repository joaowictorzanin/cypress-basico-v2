/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste.'
    cy.get('#firstName').type('João').should('have.value', 'João')
    cy.get('#lastName').type('Zanin').should('have.value', 'Zanin')
    cy.get('#email').type('jwzanin@gmail.com').should('have.value', 'jwzanin@gmail.com')
    cy.get('#phone').type('51992693011').should('have.value', '51992693011')
    cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText)
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })
  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste.'
    cy.get('#firstName').type('João').should('have.value', 'João')
    cy.get('#lastName').type('Zanin').should('have.value', 'Zanin')
    cy.get('#email').type('jwzaningmail.com').should('have.value', 'jwzaningmail.com')
    cy.get('#phone').type('51992693011').should('have.value', '51992693011')
    cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText)
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone fica vazio se nao for preenchido com numeros', () => {
    cy.get('#phone').type('testeteste').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste.'
    cy.get('#firstName').type('João').should('have.value', 'João')
    cy.get('#lastName').type('Zanin').should('have.value', 'Zanin')
    cy.get('#email').type('jwzanin@gmail.com').should('have.value', 'jwzanin@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText)
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('João').should('have.value', 'João')
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').type('Zanin').should('have.value', 'Zanin')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').type('jwzanin@gmail.com').should('have.value', 'jwzanin@gmail.com')
    cy.get('#email').clear('').should('have.value', '')
    cy.get('#phone').type('51992693011').should('have.value', '51992693011')
    cy.get('#phone').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu texto', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu texto', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check('feedback').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each((radio) => {
        cy.wrap(radio).check().should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('sampleFile')
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    cy.get('a').invoke('removeAttr', 'target').click()
    cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
  })

})