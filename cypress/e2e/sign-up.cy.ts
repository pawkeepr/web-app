/// <reference types="cypress" />
// @ts-check
import { cpf } from 'cpf-cnpj-validator';

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })
  it('should display steps of the SignUp form when clicking the next button', () => {
    cy.wait(1000); // Aguarda 1 segundo

    cy.get('[data-testid="step-01"] input[name="email"]').type('johndoe@example.com')
    cy.get('[data-testid="step-01"] input[name="password"]').type('senhaValida@123')
    cy.get('[data-testid="step-01"] input[name="passwordConfirm"]').type('senhaValida@123')
    cy.get('[data-testid="step-01"] .next').click();
    cy.get('[data-testid="step-02"]').should('be.visible');
    cy.wait(1000); // Aguarda 1 segundo

    cy.get('[data-testid="step-02"] input[name="person.firstName"]').type('John')
    cy.get('[data-testid="step-02"] input[name="person.lastName"]').type('Doe')
    cy.get('[data-testid="step-02"] input[name="person.document"]').type(cpf.generate())
    cy.get('[data-testid="step-02"] input[name="person.crmv"]').type('AA0000')
    cy.get('[data-testid="step-02"] input[name="person.phoneNumber"]').type('(79) 00000-0000')
    cy.get('[data-testid="step-02"] .next').click();
    cy.wait(1000); // Aguarda 1 segundo

    cy.get('[data-testid="step-03"]').should('be.visible');

  });

  it('should display the first step of the SignUp form', () => {
    cy.get('[data-testid="step-01"]').should('be.visible');
  });

  it('should display an error message when submitting the form with invalid fields', async () => {
    cy.get('[data-testid="step-01"] input[name="email"]').type('invalid-email').blur();
    cy.wait(1000); // Aguarda 1 segundo
    cy.get('[data-testid="step-01"] input[name="email"] + .text-danger').should('be.visible');

    cy.get('[data-testid="step-01"] button[type="submit"]').click();
  });

})