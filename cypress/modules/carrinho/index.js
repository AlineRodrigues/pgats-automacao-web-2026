function adicionarProdutoAoCarrinho(nomeDoProduto) {
  cy.contains(".features_items .product-image-wrapper", nomeDoProduto)
    .find(".productinfo .add-to-cart")
    .click();
  cy.get("#cartModal").should("be.visible");
}

function continuarComprando() {
  cy.get("#cartModal .close-modal").click();
  cy.get("#cartModal").should("not.be.visible");
}

function acessarCarrinho() {
  cy.get('.navbar-nav a[href="/view_cart"]').click();
}

function verificarSePaginaDoCarrinhoFoiExibida(nomeDoProduto) {
  cy.url().should("include", "/view_cart");
  cy.get("#cart_info_table").should("be.visible");
  cy.get("#cart_info_table .cart_description h4 a")
    .should("be.visible")
    .and("contain", nomeDoProduto);
}

module.exports = {
  adicionarProdutoAoCarrinho,
  continuarComprando,
  acessarCarrinho,
  verificarSePaginaDoCarrinhoFoiExibida,
};
