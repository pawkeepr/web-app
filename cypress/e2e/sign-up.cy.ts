/// <reference types="cypress" />
// @ts-check

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it('should to be true', () => {
    expect(true).be.true
  })
})