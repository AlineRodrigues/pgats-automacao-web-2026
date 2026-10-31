function preencherLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(senha);
  cy.get('[data-qa="login-button"]').click();
}
function verificarSeLoginFoiEfetuadoComSucesso() {
  cy.contains(".navbar-nav li", "PGATS Aut");
  cy.get(".navbar-na").contains("PGATS Aut").should("be.visible");
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  cy.get('form[action*="login"] > p').should(
    "contain",
    "Your email or password is incorrect!",
  );
}

function verificaSeMensagemDeCadastroExistenteFoiExibida() {
  cy.get("form[action*=signup] p")
    .should("exist")
    .should("be.visible")
    .should("contain", "Email Address already exist!")
    .and("contain.text", "Email Address already exist!");
}

module.exports = {
  preencherLogin,
  verificarSeLoginFoiEfetuadoComSucesso,
  verificarSeMensagemDeErroFoiExibidaNoLogin,
  verificaSeMensagemDeCadastroExistenteFoiExibida,
};
