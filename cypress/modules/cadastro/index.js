function iniciarCadastro(nome, email) {
  cy.get('[data-qa="signup-name"]').type(nome);
  cy.get('[data-qa="signup-email"]').type(email);

  cy.get('[data-qa="signup-button"]').click();
}

function preencherCadastro() {
  cy.get("#id_gender2").check();
  cy.get('[data-qa="password"]').type("123456");
  cy.get('[data-qa="days"]').select("1");
  cy.get('[data-qa="months"]').select("10");
  cy.get('[data-qa="years"]').select("2000");
  cy.get("#newsletter").check();
  cy.get("#optin").check();
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
}

function verificarSeCadastroFoiFeitoComSucesso() {
  cy.get('[data-qa="account-created"]')
    .should("be.visible")
    .and("contain", "Account Created!");
}

module.exports = {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiFeitoComSucesso,
};
