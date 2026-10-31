/// <reference types="cypress" />

describe("Automation Exercise", () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  it("CT01 - Cadastrar um novo usuário com sucesso", () => {
    cy.visit("/");
    cy.get('a[href="/login"]').click();

    cy.get('[data-qa="signup-name"]').type("PGTAS Aut");
    cy.get('[data-qa="signup-email"]').type(`pgats+${Date.now()}@test.com`);
    cy.get('[data-qa="signup-button"]').click();

    //radio buttons -> check
    cy.get("#id_gender2").check();

    cy.get('[data-qa="password"]').type(123456);

    // Selects e Comboboxes  -> select
    cy.get('[data-qa="days"]').select("1");
    cy.get('[data-qa="months"]').select("10");
    cy.get('[data-qa="years"]').select("2000");
    // Checkboxes - check

    cy.get("#newsletter").check();
    cy.get("#optin").check();

    //Address
    cy.get('[data-qa="first_name"]').type("Teste");
    cy.get('[data-qa="last_name"]').type("Automation");
    cy.get('[data-qa="company"]').type("Test");
    cy.get('[data-qa="address"]').type("Rua Doze");
    cy.get('[data-qa="address2"]').type("13");
    cy.get('[data-qa="country"]').select("Canada");
    cy.get('[data-qa="state"]').type("Alberta");
    cy.get('[data-qa="city"]').type("Edmonton");
    cy.get('[data-qa="zipcode"]').type("00000000");
    cy.get('[data-qa="mobile_number"]').type("+178054898765");

    cy.get('[data-qa="create-account"]').click();

    cy.get('[data-qa="account-created"]')
      .should("be.visible")
      .and("contain", "Account Created!");
  });

  it("CT02 - Efetuar Login de Usuário com email e senha corretos", () => {
    cy.visit("/login");
    cy.get('[data-qa="login-email"]').type("pgats+1792297261532@test.com");
    cy.get('[data-qa="login-password"]').type("123456");
    cy.get('[data-qa="login-button"]').click();

    cy.get("a > b").should("contain", "PGTAS Aut");
  });

  it("CT03 - Efetuar Login de Usuário com email e senha incorretos", () => {
    cy.visit("/login");
    cy.get('[data-qa="login-email"]').type("pgats+1792297261532@test.com");
    cy.get('[data-qa="login-password"]').type("111111");
    cy.get('[data-qa="login-button"]').click();

    cy.get('form[action*="login"] > p').should(
      "contain",
      "Your email or password is incorrect!",
    );
  });

  it("CT04 - Efetuar Logout", () => {
    cy.visit("/login");
    cy.get('[data-qa="login-email"]').type("pgats+1792297261532@test.com");
    cy.get('[data-qa="login-password"]').type("123456");
    cy.get('[data-qa="login-button"]').click();

    //cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should("be.visible").click();
    cy.get(".login-form > h2").should("be.visible");
  });

  it("CT05 - Tentar cadastrar usuário com e-mail já cadastrado", () => {
    cy.visit("/");
    cy.get('a[href="/login"]').click();

    cy.get('[data-qa="signup-name"]').type("PGTAS Aut");
    cy.get('[data-qa="signup-email"]').type("pgats+1792297261532@test.com");
    cy.get('[data-qa="signup-button"]').click();

    cy.get("form[action*=signup] p")
      .should("exist")
      .should("be.visible")
      .should("contain", "Email Address already exist!")
      .and("contain.text", "Email Address already exist!");
  });
});
