/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />
// @ts-check
import { cpf } from 'cpf-cnpj-validator';

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it('should display steps of the SignUp form when clicking the next button', async () => {
    cy.wait(200); // Aguarda 0.2 segundo


    // Etapa 1
    cy.get('[data-testid="step-01"] input[name="email"]').type('johndoe@example.com', { force: true })
    cy.get('[data-testid="step-01"] input[name="password"]').type('senhaValida@123')
    cy.get('[data-testid="step-01"] input[name="passwordConfirm"]').type('senhaValida@123')
    cy.get('[data-testid="step-01"] .next').click();
    cy.wait(500); // Aguarda 0.5 segundo

    // Etapa 2
    cy.get('[data-testid="step-02"]').should('be.visible');
    cy.get('[data-testid="step-02"] input[name="person.firstName"]').type('John')
    cy.get('[data-testid="step-02"] input[name="person.lastName"]').type('Doe')
    cy.get('[data-testid="step-02"] input[name="person.document"]').type(cpf.generate())
    cy.get('[data-testid="step-02"] input[name="person.crmv"]').type('AA0000')
    cy.get('[data-testid="step-02"] input[name="person.phoneNumber"]').type('(79) 00000-0000')
    cy.get('[data-testid="step-02"] .next').click();
    cy.wait(500); // Aguarda 0.5 segundo

    // Etapa 3
    cy.get('[data-testid="step-03"]').should('be.visible');
    cy.get('[data-testid="step-03"] input[name="address.zipCode"]').type('48793-000')
    cy.wait(1000); // Aguarda 1 segundo
    cy.get('[data-testid="step-03"] input[name="address.number"]').type('51')
    cy.get('[data-testid="step-03"] input[name="address.street"]').type('Avenida João Pessoa')
    cy.get('[data-testid="step-03"] input[name="address.complement"]').type('Casa')
    cy.get('[data-testid="step-03"] .next').click();
    cy.wait(500); // Aguarda 0.5 segundo

    // Etapa 4
    cy.get('[data-testid="step-04"]').should('be.visible');
    cy.get('[data-testid="step-04"] input[name="termsOfUse"]').check()
    cy.get('[data-testid="step-04"] .btn-success').click();
    cy.wait(500); // Aguarda 0.5 segundo

  });
})