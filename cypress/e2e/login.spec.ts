describe("Login spec",() => {

    it('should render the login page', () => { 
        // ARRANGE

        // ACT
        cy.visit('/')
        // ASSERT
    })

    it('should focus the user input when clicked', () => { 
        // ARRANGE

        // ACT
        cy.visit('/')
        cy.findByRole('textbox').click()

        // ASSERT
        cy.focused().should('have.attr', 'name', 'user')
    })

    it('should display validation error messages when submitting empty credentials', () => { 
        // ARRANGE

        // ACT
        cy.visit('/')
        cy.findByRole('button').click()

        cy.findAllByText('Debe informar el campo').eq(0).as('errorMessage')

        // ASSERT
        cy.get('@errorMessage').should('be.visible')
    })

    it('should display an error message when logging in with invalid credentials', () => {
        // ARRANGE
        const user:string = 'admin'
        const password:string = '123'
        // ACT
        cy.visit('/')
        cy.findByRole('textbox').as('userInput')
        cy.findByLabelText('Contraseña *').as('userPassword')
        cy.findByRole('button').as('buttonClick')

        cy.get('@userInput').type(user)
        cy.get('@userPassword').type(password)
        cy.get('@buttonClick').click()

        // ASSERT
        cy.contains('div','Usuario y/o password no válidos').should('be.visible')
    })

    it('should navigate to the main page when logging in with valid credentials', () => {
        // ARRANGE
        const user:string = 'admin'
        const password:string = 'test'
        // ACT
        cy.visit('/')
        cy.findByRole('textbox').as('userInput')
        cy.findByLabelText('Contraseña *').as('userPassword')
        cy.findByRole('button').as('buttonClick')
        cy.url().should('equal','http://localhost:5173/#/')
        cy.get('@userInput').type(user)
        cy.get('@userPassword').type(password)

        cy.get('@buttonClick').click()

        // ASSERT
        cy.url().should('equal','http://localhost:5173/#/submodule-list')
        cy.location('hash').should('equal', '#/submodule-list')
    })

    

})
