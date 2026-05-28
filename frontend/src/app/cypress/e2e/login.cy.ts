describe('🔐 Login Page', () => {
  
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form with all fields', () => {
    cy.get('[data-cy="email-input"]').should('be.visible')
    cy.get('[data-cy="password-input"]').should('be.visible')
    cy.get('.login-button').should('contain', 'Login').and('be.visible')
    cy.get('.header-texts h1').should('contain', 'Login.')
  })

  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '**/api/auth/login').as('loginRequest')
    
    cy.get('[data-cy="email-input"]').type('admin@system.com')
    cy.get('[data-cy="password-input"]').type('admin123')
    cy.get('.login-button').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)
    
    cy.url().should('not.include', '/login')
  })

  it('should show error message with wrong password', () => {
    cy.intercept('POST', '**/api/auth/login').as('loginRequest')
    
    cy.get('[data-cy="email-input"]').type('admin@system.com')
    cy.get('[data-cy="password-input"]').type('wrongpass')
    cy.get('.login-button').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)
    cy.get('[data-cy="error-msg"]').should('be.visible')
    cy.url().should('include', '/login')
  })

  it('should show error message with unknown email', () => {
    cy.intercept('POST', '**/api/auth/login').as('loginRequest')
    
    cy.get('[data-cy="email-input"]').type('unknown@test.com')
    cy.get('[data-cy="password-input"]').type('123456')
    cy.get('.login-button').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)
    cy.get('[data-cy="error-msg"]').should('be.visible')
  })

  it('should redirect to login when accessing dashboard without auth', () => {
    cy.visit('/dashboard')
    cy.url().should('include', '/login')
  })
})