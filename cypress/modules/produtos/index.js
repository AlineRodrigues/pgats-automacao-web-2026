function bloquearAnuncios() {
  cy.intercept("**/*googlesyndication.com/**", { statusCode: 204, body: "" });
  cy.intercept("**/*doubleclick.net/**", { statusCode: 204, body: "" });
}

function verificarSePaginaInicialEstaVisivel() {
  cy.url().should("eq", `${Cypress.config("baseUrl")}`);
  cy.title().should("eq", "Automation Exercise");
  cy.get("#slider").should("be.visible");
}

function acessarPaginaDeProdutos() {
  cy.get('.navbar-nav a[href="/products"]').click();
}

function verificarSePaginaTodosOsProdutosFoiExibida() {
  cy.url().should("include", "/products");
  cy.get("h2.title.text-center")
    .should("be.visible")
    .and("contain", "All Products");
}

function verificarSeListaDeProdutosEstaVisivel() {
  cy.get(".features_items .product-image-wrapper")
    .should("have.length.greaterThan", 0)
    .first()
    .should("be.visible");
}

function acessarDetalhesDoPrimeiroProduto() {
  cy.get('.features_items .choose a[href^="/product_details/"]')
    .first()
    .should("contain", "View Product")
    .click();
}

function verificarSePaginaDeDetalhesDoProdutoFoiExibida() {
  cy.url().should("include", "/product_details/");
  cy.get(".product-information").should("be.visible");
}

function verificarSeDetalhesDoProdutoEstaoVisiveis() {
  cy.get(".product-information").within(() => {
    cy.get("h2").should("be.visible").and("not.be.empty");
    cy.contains("p", "Category:").should("be.visible");
    cy.contains("p", "Availability:").should("be.visible");
    cy.contains("p", "Condition:").should("be.visible");
    cy.contains("p", "Brand:").should("be.visible");
    cy.contains("span span", "Rs.").should("be.visible");
  });
}

function pesquisarProduto(nomeDoProduto) {
  cy.get("#search_product").type(nomeDoProduto);
  cy.get("#submit_search").click();
}

function verificarSeSecaoProdutosPesquisadosEstaVisivel() {
  cy.get("h2.title.text-center")
    .should("be.visible")
    .and("contain", "Searched Products");
}

function verificarSeProdutosDaPesquisaEstaoVisiveis(nomeDoProduto) {
  cy.get(".features_items .product-image-wrapper")
    .should("have.length.greaterThan", 0)
    .each(($produto) => {
      cy.wrap($produto).should("be.visible");
      cy.wrap($produto)
        .find(".productinfo p")
        .should("contain.text", nomeDoProduto);
    });
}

module.exports = {
  bloquearAnuncios,
  verificarSePaginaInicialEstaVisivel,
  acessarPaginaDeProdutos,
  verificarSePaginaTodosOsProdutosFoiExibida,
  verificarSeListaDeProdutosEstaVisivel,
  acessarDetalhesDoPrimeiroProduto,
  verificarSePaginaDeDetalhesDoProdutoFoiExibida,
  verificarSeDetalhesDoProdutoEstaoVisiveis,
  pesquisarProduto,
  verificarSeSecaoProdutosPesquisadosEstaVisivel,
  verificarSeProdutosDaPesquisaEstaoVisiveis,
};
