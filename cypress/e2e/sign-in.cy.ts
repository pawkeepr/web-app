/// <reference types="cypress" />


// @ts-check

describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
  })

  it('should sign in with username', () => {
    cy.get('input[name="username"]').type('email@hotmail.com')
    cy.get('input[name="password"]').type('123456')
  })

})