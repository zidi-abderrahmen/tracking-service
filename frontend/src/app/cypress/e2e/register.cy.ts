describe('📝 Add User Page', () => {
  
  beforeEach(() => {
    cy.visit('/add-user')
  })

  it('should display add user form with all fields', () => {
    cy.get('h1').should('contain', 'ADD USER')
    cy.get('input[name="firstName"]').should('be.visible')
    cy.get('input[name="lastName"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('select[name="role"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('input[name="confirmPassword"]').should('be.visible')
    cy.get('.add-button').should('contain', 'Add').and('be.visible')
  })

  it('should add new user successfully', () => {
    cy.intercept('POST', '**/api/users').as('addUserRequest')

    cy.get('input[name="firstName"]').type('Ali')
    cy.get('input[name="lastName"]').type('Ben Salah')
    cy.get('input[name="email"]').type('ali' + Date.now() + '@test.com')
    cy.get('select[name="role"]').select('ENGINEER')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('password123')
    
    cy.get('.add-button').click()

    cy.wait('@addUserRequest').its('response.statusCode').should('eq', 201)
    cy.url().should('not.include', '/add-user')
  })

  it('should show error when email already exists', () => {
    cy.intercept('POST', '**/api/users').as('addUserRequest')
    
    cy.get('input[name="firstName"]').type('Abdo')
    cy.get('input[name="lastName"]').type('Zidi')
    cy.get('input[name="email"]').type('abdo@test.com')
    cy.get('select[name="role"]').select('ADMIN')
    cy.get('input[name="password"]').type('123456')
    cy.get('input[name="confirmPassword"]').type('123456')
    
    cy.get('.add-button').click()

    cy.wait('@addUserRequest').its('response.statusCode').should('eq', 409)
  })

  it('should not submit when form is empty (button disabled)', () => {
    cy.get('.add-button').should('be.disabled')
  })
})