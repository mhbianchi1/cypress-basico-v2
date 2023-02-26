/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios do formulário', function(){
        const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste '
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Helena')
        cy.get('#email').type('mhbianchi@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Helena')
        cy.get('#email').type('mhbianchi.gmail.com')
        cy.get('#open-text-area').type('TESTE')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('validar que o campo telefone não aceita caracteres que não sejam números', function() {
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Helena')
        cy.get('#email').type('mhbianchi@gmail.com')
        cy.get('#phone')
          .type('abc')
          .should('have.value', '')
        cy.get('#open-text-area').type('TESTE')
        cy.contains('button', 'Enviar').click()
    })

    it('exibe mensagem de erro ao submeter o formulário sem informar o telefone, quando ele for obrigatório', function() {
        cy.get('#firstName').type('Maria')
        cy.get('#lastName').type('Helena')
        cy.get('#email').type('mhbianchi@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('TESTE')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        const name = 'Maria'
        const lastName = 'Bianchi'
        const email = 'mhbianchi@gmail.com'
        const phone = '18997687071'

        cy.get('#firstName')
          .type(name)
          .should('have.value', name)
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type(lastName)
          .should('have.value', lastName)
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type(email)
          .should('have.value', email)
          .clear()
          .should('have.value', '')
          cy.get('#phone')
          .type(phone)
          .should('have.value', phone)
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
          .type('TESTE')
          .should('have.value', 'TESTE')
          .clear()
          .should('have.value', '')
          cy.contains('button', 'Enviar').click()
       
    })

    it('exibe mensagem de erro ao submeter o formulário sem informar os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia formulário customizado com sucesso utilizando comandos customizados', function() {
       cy.fillMandatoryFieldsAndSubmit()
       cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')      
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)     
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        }) 
    })

    it('marcar ambos checkboxes, e depois desmarca o ultimo', function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('selecionando arquivo da pasta fixtures', function(){
      cy.get("#file-upload")
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo drag and drop', function(){
      cy.get("#file-upload")
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('selecionando arquivo utilizando fixtures a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get("#file-upload")
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a política de privacidade removendo o target e abrindo o link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    

  })