//@ts-ignore
declare namespace Cypress {
  interface Chainable {
    /**
     * Inicia sesión y guarda la sesión en caché
     * @example cy.login('usuario@email.com', '123456')
     */
    login(email: string, password: string): Chainable<void>
  }
}

Cypress.Commands.add('login', (user: string, password: string) => {
        cy.visit('/')
        // ACT
        cy.visit('/')
        cy.findByRole('textbox').as('userInput')
        cy.findByLabelText('Contraseña *').as('userPassword')
        cy.findByRole('button').as('buttonClick')
        cy.url().should('equal','http://localhost:5173/#/')
        cy.get('@userInput').type(user)
        cy.get('@userPassword').type(password)

        cy.get('@buttonClick').click()
})