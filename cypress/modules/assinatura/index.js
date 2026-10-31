function rolarAteRodape() {
  cy.get("#footer").scrollIntoView().should("be.visible");
}

function verificarSeTextoAssinaturaEstaVisivel() {
  cy.get("#footer .single-widget h2")
    .contains("Subscription")
    .should("be.visible");
}

function realizarAssinatura(email) {
  cy.get("#susbscribe_email").type(email);
  cy.get("#subscribe").click();
}

function verificarSeMensagemDeAssinaturaComSucessoEstaVisivel() {
  cy.get("#success-subscribe .alert-success")
    .should("be.visible")
    .and("contain", "You have been successfully subscribed!");
}

module.exports = {
  rolarAteRodape,
  verificarSeTextoAssinaturaEstaVisivel,
  realizarAssinatura,
  verificarSeMensagemDeAssinaturaComSucessoEstaVisivel,
};
