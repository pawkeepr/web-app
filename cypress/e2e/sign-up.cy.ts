/// <reference types="cypress" />
// @ts-check

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
  })

  it.only('should display the first step of the SignUp form', () => {
    cy.get('[data-testid="step-01"]').should('be.visible');
  });

  it.only('should display the second step of the SignUp form when clicking the next button', () => {
    cy.get('[data-testid="step-01"] input[name="email"]').type('johndoe@example.com')
    cy.get('[data-testid="step-01"] input[name="username"]').type('johndoe')
    cy.get('[data-testid="step-01"] input[name="password"]').type('senhaValida@123')
    cy.get('[data-testid="step-01"] input[name="passwordConfirm"]').type('senhaValida@123')
    cy.get('[data-testid="step-01"] input[name="termsOfUse"]').check()
    cy.get('[data-testid="step-01"] .next').click();
    cy.get('[data-testid="step-02"]').should('be.visible');
  });

  it.only('should display an error message when submitting the form with invalid fields', async () => {
    cy.get('[data-testid="step-01"] input[name="email"]').type('invalid-email').blur();
    cy.wait(1000); // Aguarda 1 segundo para permitir que a validação seja concluída
    cy.get('[data-testid="step-01"] input[name="email"] + .text-danger').should('be.visible');

    cy.get('[data-testid="step-01"] input[name="username"]').type('a').blur();
    cy.wait(1000); // Aguarda 1 segundo para permitir que a validação seja concluída
    cy.get('[data-testid="step-01"] input[name="username"] + .text-danger').should('be.visible');

    cy.get('[data-testid="step-01"] button[type="submit"]').click();
  });

  // it.only('should sign up a new user', () => {
  //   cy.intercept('POST', '/signup', (req) => {
  //     req.reply({
  //       status: 200,
  //       body: {
  //         message: 'User successfully signed up!',
  //         user: {
  //           id: 1,
  //           name: 'John Doe',
  //           email: 'johndoe@example.com',
  //         },
  //       },
  //     })
  //   })

  //   cy.get('[data-testid="step-01"] input[name="email"]').type('johndoe@example.com')
  //   cy.get('[data-testid="step-01"] input[name="username"]').type('johndoe')
  //   cy.get('[data-testid="step-01"] input[name="password"]').type('123456')
  //   cy.get('[data-testid="step-01"] input[name="passwordConfirm"]').type('123456')
  //   cy.get('[data-testid="step-01"] input[name="termsOfUse"]').check()
  //   cy.get('[data-testid="step-01"] .next').click();

  //   cy.get('[data-testid=signup-button]').click()

  //   cy.contains('User successfully signed up!')
  //   cy.contains('Name: John Doe')
  //   cy.contains('Email: johndoe@example.com')
  // })

})