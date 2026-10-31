function preencherLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(senha);
  cy.get('[data-qa="login-button"]').click();
}
function verificarSeLoginFoiEfetuadoComSucesso(nomeDeUsuario) {
  cy.contains(".navbar-nav li", `Logged in as ${nomeDeUsuario}`).should(
    "be.visible",
  );
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  cy.get('form[action*="login"] > p').should(
    "contain",
    "Your email or password is incorrect!",
  );
}

function acessarPaginaDeLoginECadastro() {
  cy.get('a[href="/login"]').click();
}

function verificarSeSecaoLoginEstaVisivel() {
  cy.get(".login-form > h2")
    .should("be.visible")
    .and("contain", "Login to your account");
}

module.exports = {
  preencherLogin,
  verificarSeLoginFoiEfetuadoComSucesso,
  verificarSeMensagemDeErroFoiExibidaNoLogin,
  acessarPaginaDeLoginECadastro,
  verificarSeSecaoLoginEstaVisivel,
};
