/// <reference types="cypress" />

const {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiFeitoComSucesso,
} = require("../../modules/cadastro");
const {
  preencherLogin,
  verificarSeLoginFoiEfetuadoComSucesso,
  verificarSeMensagemDeErroFoiExibidaNoLogin,
  verificaSeMensagemDeCadastroExistenteFoiExibida,
} = require("../../modules/login");
const { efetuarLogout } = require("../../modules/logout");
const {
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
} = require("../../modules/produtos");

describe("Automation Exercise", () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  it("CT01 - Cadastrar um novo usuário com sucesso", () => {
    cy.visit("https://automationexercise.com/");
    cy.get('a[href="/login"]').click();

    iniciarCadastro("PGTAS Aut", `pgats-${Date.now()}@test.com`);
    preencherCadastro();
    verificarSeCadastroFoiFeitoComSucesso();
  });

  it("CT02 - Efetuar Login de Usuário com email e senha corretos", () => {
    cy.visit("https://automationexercise.com/login");
    preencherLogin("pgats+1792297261532@test.com", "123456");
    verificarSeLoginFoiEfetuadoComSucesso;
  });

  it("CT03 - Efetuar Login de Usuário com email e senha incorretos", () => {
    cy.visit("https://automationexercise.com/login");
    preencherLogin("pgats+1792297q261532@test.com", "111111");
    verificarSeMensagemDeErroFoiExibidaNoLogin;
  });

  it("CT04 - Efetuar Logout", () => {
    cy.visit("https://automationexercise.com/login");
    preencherLogin("pgats+1792297261532@test.com", "123456");
    verificarSeLoginFoiEfetuadoComSucesso;
    efetuarLogout;
  });

  it("CT05 - Tentar cadastrar usuário com e-mail já cadastrado", () => {
    cy.visit("https://automationexercise.com/login");
    iniciarCadastro("PGTAS Aut", "pgats+1792297261532@test.com");
    verificaSeMensagemDeCadastroExistenteFoiExibida;
  });

  it("CT08 - Verificar todos os produtos e a página de detalhes do produto", () => {
    bloquearAnuncios();
    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeProdutos();
    verificarSePaginaTodosOsProdutosFoiExibida();
    verificarSeListaDeProdutosEstaVisivel();

    acessarDetalhesDoPrimeiroProduto();
    verificarSePaginaDeDetalhesDoProdutoFoiExibida();
    verificarSeDetalhesDoProdutoEstaoVisiveis();
  });

  it("CT09 - Pesquisar produto", () => {
    const nomeDoProduto = "Blue Top";

    bloquearAnuncios();
    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeProdutos();
    verificarSePaginaTodosOsProdutosFoiExibida();

    pesquisarProduto(nomeDoProduto);
    verificarSeSecaoProdutosPesquisadosEstaVisivel();
    verificarSeProdutosDaPesquisaEstaoVisiveis(nomeDoProduto);
  });
});
