function clicarEmContinuar() {
  cy.get('[data-qa="continue-button"]').should("be.visible").click();
}

function excluirConta() {
  cy.get('.navbar-nav a[href="/delete_account"]').click();
}

function verificarSeContaFoiExcluida() {
  cy.get('[data-qa="account-deleted"]')
    .should("be.visible")
    .and("contain", "Account Deleted!");
}

module.exports = {
  clicarEmContinuar,
  excluirConta,
  verificarSeContaFoiExcluida,
};
