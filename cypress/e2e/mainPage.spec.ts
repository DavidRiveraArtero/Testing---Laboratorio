describe('Main page test',() => {
    beforeEach(() => {
        // 1. Restaura o crea la sesión en milisegundos
        cy.login('admin', 'test')
        
        // 2. IMPORTANTE: cy.session deja la página en blanco (about:blank),
        // así que siempre debes hacer cy.visit() justo después

    })

    it('should redirect to login page when we click to logout button ', () => { 
        // ARRANGE  

        // ACT
        cy.findAllByRole('button').eq(1).as('btnProfile')
        cy.get('@btnProfile').click()
        cy.findByText('Cerrar sesión').as('logout')
        // ASSERT
        cy.get('@logout').should('be.visible')
        cy.get('@logout').click()

        cy.url().should('include','/#/login')
    }) 

    it('should render a menu when we click the menu button', () => {
        // ARRANGE

        // ACT
        cy.findAllByRole('button').eq(0).as('btnMenu')
        cy.get('@btnMenu').should('be.visible')

        cy.get('@btnMenu').click()

        cy.findByText('Calendario').as('btnCalendar')
    
        // ASSERT
        cy.get('@btnCalendar').should('be.visible')
    })

    it('should render project page when we click to project button', () => {
        // ARRANGE
        
        // ACT
        cy.findByRole('link', {
            name: 'Proyectos'
        }).as('navigateProject')

        cy.get('@navigateProject').click()
        // ASSERT
        cy.url().should('include', '/#/projects')
    })

})