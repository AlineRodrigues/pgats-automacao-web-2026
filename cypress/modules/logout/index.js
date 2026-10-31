function efetuarLogout() {
  cy.get('a[href*="logout"]').should("be.visible").click();
  cy.get(".login-form > h2").should("be.visible");
}
module.exports = {
  efetuarLogout,
};
