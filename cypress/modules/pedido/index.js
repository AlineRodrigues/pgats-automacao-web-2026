function finalizarCompra() {
  cy.get("a.check_out").should("be.visible").click();
}

function verificarEnderecoEPedido(nomeDoProduto) {
  cy.url().should("include", "/checkout");
  cy.get("#address_delivery")
    .should("be.visible")
    .and("contain", "Rua Doze")
    .and("contain", "Edmonton")
    .and("contain", "Canada")
    .and("contain", "+178054898765");
  cy.get("#address_invoice").should("be.visible");
  cy.get("#cart_info")
    .should("be.visible")
    .and("contain", nomeDoProduto);
}

function fazerPedidoComComentario(comentario) {
  cy.get('textarea[name="message"]').type(comentario);
  cy.get('a[href="/payment"]').click();
}

function preencherDadosDePagamento({ nome, numero, cvc, mes, ano }) {
  cy.get('[data-qa="name-on-card"]').type(nome);
  cy.get('[data-qa="card-number"]').type(numero);
  cy.get('[data-qa="cvc"]').type(cvc);
  cy.get('[data-qa="expiry-month"]').type(mes);
  cy.get('[data-qa="expiry-year"]').type(ano);
}

function confirmarPedido() {
  cy.get('[data-qa="pay-button"]').click();
}

function verificarSePedidoFoiRealizadoComSucesso() {
  cy.url().should("include", "/payment_done");
  cy.get('[data-qa="order-placed"]')
    .should("be.visible")
    .and("contain", "Order Placed!");
  cy.contains("Congratulations! Your order has been confirmed!").should(
    "be.visible",
  );
}

module.exports = {
  finalizarCompra,
  verificarEnderecoEPedido,
  fazerPedidoComComentario,
  preencherDadosDePagamento,
  confirmarPedido,
  verificarSePedidoFoiRealizadoComSucesso,
};
