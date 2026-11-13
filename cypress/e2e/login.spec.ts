describe("Login spec",() => {

    it('visi login page', () => { 
        // ARRANGE

        // ACT
        cy.visit('/')
        // ASSERT
    })

    it('should user input has been focus when it clicks on', () => { 
        // ARRANGE

        // ACT
        cy.visit('/')
        cy.findByRole('textbox').click()

        // ASSERT
        cy.focused().should('have.attr', 'name', 'user')
    })

    it('should show a error message when we login with not credentials', () => { 
        // ARRANGE

        // ACT
        cy.visit('/')
        cy.findByRole('button').click()

        cy.findAllByText('Debe informar el campo').eq(0).as('errorMessage')

        // ASSERT
        cy.get('@errorMessage').should('be.visible')
    })

    it('should show a popup error message when we login with invalid credentials', () => {
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

    it('should navigate to main page when we login with valid credentials', () => {
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
