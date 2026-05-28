/// <reference types="cypress" />

describe('📊 Report Dashboard', () => {
  
  beforeEach(() => {
    cy.request('POST', Cypress.env('apiUrl') + '/api/auth/login', {
      email: 'abdo@test.com',
      password: '123456'
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token || '')
    })
    
    cy.visit('/report')
  })

  it('should display report page with welcome message', () => {
    cy.get('[data-cy="welcome-message"]').should('contain', 'REPORT')
    cy.get('input[name="client"]').should('be.visible')
    cy.get('input[name="service"]').should('be.visible')
    cy.get('input[name="startDate"]').should('be.visible')
    cy.get('input[name="endDate"]').should('be.visible')
    cy.get('.submit-button').should('contain', 'Submit')
  })

  it('should search and display timesheets in table', () => {
    cy.intercept('GET', '**/api/timesheets/**').as('getReport')
    
    cy.get('input[name="client"]').type('TechCorp')
    cy.get('input[name="startDate"]').type('2026-01-01')
    cy.get('input[name="endDate"]').type('2026-12-31')
    
    cy.get('.submit-button').click()

    cy.wait('@getReport').its('response.statusCode').should('eq', 200)
    
    cy.get('table').should('be.visible')
    cy.get('table thead tr th').should('contain', 'SERVICE')
    cy.get('table thead tr th').should('contain', 'CLIENT')
    cy.get('table thead tr th').should('contain', 'DATE')
    cy.get('table thead tr th').should('contain', 'HOURS')
  })

  it('should show empty message when no results', () => {
    cy.intercept('GET', '**/api/timesheets/**').as('getReport')
    
    cy.get('input[name="client"]').type('ClientInexistant123')
    cy.get('input[name="startDate"]').type('2026-01-01')
    cy.get('input[name="endDate"]').type('2026-01-02')
    
    cy.get('.submit-button').click()
    
    cy.wait('@getReport')
    cy.get('.empty-message').should('contain', 'No report found.')
  })

  it('should logout and redirect to login', () => {
    window.localStorage.removeItem('token')
    cy.visit('/report')
    cy.url().should('include', '/login')
  })
})