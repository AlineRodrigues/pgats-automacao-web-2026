/// <reference types="cypress" />

const {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiFeitoComSucesso,
  criarConta,
  verificarSeSecaoNovoUsuarioEstaVisivel,
  verificarSeTelaDeInformacoesDaContaEstaVisivel,
  verificaSeMensagemDeCadastroExistenteFoiExibida,
} = require("../../modules/cadastro");
const {
  preencherLogin,
  verificarSeLoginFoiEfetuadoComSucesso,
  verificarSeMensagemDeErroFoiExibidaNoLogin,
  acessarPaginaDeLoginECadastro,
  verificarSeSecaoLoginEstaVisivel,
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
const {
  rolarAteRodape,
  verificarSeTextoAssinaturaEstaVisivel,
  realizarAssinatura,
  verificarSeMensagemDeAssinaturaComSucessoEstaVisivel,
} = require("../../modules/assinatura");
const {
  adicionarProdutoAoCarrinho,
  continuarComprando,
  acessarCarrinho,
  verificarSePaginaDoCarrinhoFoiExibida,
} = require("../../modules/carrinho");
const {
  finalizarCompra,
  verificarEnderecoEPedido,
  fazerPedidoComComentario,
  preencherDadosDePagamento,
  confirmarPedido,
  verificarSePedidoFoiRealizadoComSucesso,
} = require("../../modules/pedido");
const {
  clicarEmContinuar,
  excluirConta,
  verificarSeContaFoiExcluida,
} = require("../../modules/conta");

const NOME_DE_USUARIO = "PGTAS Aut";
const SENHA = "123456";
const NOME_DO_PRODUTO = "Blue Top";
const COMENTARIO_DO_PEDIDO = "Pedido gerado pela automação de testes";
const DADOS_DE_PAGAMENTO = {
  nome: NOME_DE_USUARIO,
  numero: "4111111111111111",
  cvc: "123",
  mes: "12",
  ano: "2030",
};

const gerarEmail = () => `pgats-${Date.now()}@test.com`;

function criarContaEEfetuarLogout(email) {
  criarConta(NOME_DE_USUARIO, email);
  clicarEmContinuar();
  efetuarLogout();
}

describe("Automation Exercise", () => {
  beforeEach(() => {
    bloquearAnuncios();
  });

  it("CT01 - Cadastrar um novo usuário com sucesso", () => {
    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeLoginECadastro();
    verificarSeSecaoNovoUsuarioEstaVisivel();

    iniciarCadastro(NOME_DE_USUARIO, gerarEmail());
    verificarSeTelaDeInformacoesDaContaEstaVisivel();

    preencherCadastro();
    verificarSeCadastroFoiFeitoComSucesso();
    clicarEmContinuar();
    verificarSeLoginFoiEfetuadoComSucesso(NOME_DE_USUARIO);

    excluirConta();
    verificarSeContaFoiExcluida();
    clicarEmContinuar();
  });

  it("CT02 - Efetuar Login de Usuário com email e senha corretos", () => {
    const email = gerarEmail();
    criarContaEEfetuarLogout(email);

    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeLoginECadastro();
    verificarSeSecaoLoginEstaVisivel();

    preencherLogin(email, SENHA);
    verificarSeLoginFoiEfetuadoComSucesso(NOME_DE_USUARIO);

    excluirConta();
    verificarSeContaFoiExcluida();
  });

  it("CT03 - Efetuar Login de Usuário com email e senha incorretos", () => {
    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeLoginECadastro();
    verificarSeSecaoLoginEstaVisivel();

    preencherLogin(`inexistente-${Date.now()}@test.com`, "111111");
    verificarSeMensagemDeErroFoiExibidaNoLogin();
  });

  it("CT04 - Efetuar Logout", () => {
    const email = gerarEmail();
    criarContaEEfetuarLogout(email);

    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeLoginECadastro();
    verificarSeSecaoLoginEstaVisivel();

    preencherLogin(email, SENHA);
    verificarSeLoginFoiEfetuadoComSucesso(NOME_DE_USUARIO);

    efetuarLogout();
    cy.url().should("include", "/login");
  });

  it("CT05 - Tentar cadastrar usuário com e-mail já cadastrado", () => {
    const email = gerarEmail();
    criarContaEEfetuarLogout(email);

    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeLoginECadastro();
    verificarSeSecaoNovoUsuarioEstaVisivel();

    iniciarCadastro(NOME_DE_USUARIO, email);
    verificaSeMensagemDeCadastroExistenteFoiExibida();
  });

  it("CT08 - Verificar todos os produtos e a página de detalhes do produto", () => {
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
    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeProdutos();
    verificarSePaginaTodosOsProdutosFoiExibida();

    pesquisarProduto(NOME_DO_PRODUTO);
    verificarSeSecaoProdutosPesquisadosEstaVisivel();
    verificarSeProdutosDaPesquisaEstaoVisiveis(NOME_DO_PRODUTO);
  });

  it("CT10 - Verificar assinatura na página inicial", () => {
    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    rolarAteRodape();
    verificarSeTextoAssinaturaEstaVisivel();

    realizarAssinatura(gerarEmail());
    verificarSeMensagemDeAssinaturaComSucessoEstaVisivel();
  });

  it("CT15 - Fazer pedido: Registre-se antes de finalizar a compra", () => {
    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeLoginECadastro();
    iniciarCadastro(NOME_DE_USUARIO, gerarEmail());
    preencherCadastro();
    verificarSeCadastroFoiFeitoComSucesso();
    clicarEmContinuar();
    verificarSeLoginFoiEfetuadoComSucesso(NOME_DE_USUARIO);

    acessarPaginaDeProdutos();
    verificarSePaginaTodosOsProdutosFoiExibida();
    adicionarProdutoAoCarrinho(NOME_DO_PRODUTO);
    continuarComprando();
    acessarCarrinho();
    verificarSePaginaDoCarrinhoFoiExibida(NOME_DO_PRODUTO);

    finalizarCompra();
    verificarEnderecoEPedido(NOME_DO_PRODUTO);
    fazerPedidoComComentario(COMENTARIO_DO_PEDIDO);

    preencherDadosDePagamento(DADOS_DE_PAGAMENTO);
    confirmarPedido();
    verificarSePedidoFoiRealizadoComSucesso();

    excluirConta();
    verificarSeContaFoiExcluida();
    clicarEmContinuar();
  });

  it("CT16 - Fazer pedido: Faça login antes de finalizar a compra", () => {
    const email = gerarEmail();
    criarContaEEfetuarLogout(email);

    cy.visit("/");
    verificarSePaginaInicialEstaVisivel();

    acessarPaginaDeLoginECadastro();
    preencherLogin(email, SENHA);
    verificarSeLoginFoiEfetuadoComSucesso(NOME_DE_USUARIO);

    acessarPaginaDeProdutos();
    verificarSePaginaTodosOsProdutosFoiExibida();
    adicionarProdutoAoCarrinho(NOME_DO_PRODUTO);
    continuarComprando();
    acessarCarrinho();
    verificarSePaginaDoCarrinhoFoiExibida(NOME_DO_PRODUTO);

    finalizarCompra();
    verificarEnderecoEPedido(NOME_DO_PRODUTO);
    fazerPedidoComComentario(COMENTARIO_DO_PEDIDO);

    preencherDadosDePagamento(DADOS_DE_PAGAMENTO);
    confirmarPedido();
    verificarSePedidoFoiRealizadoComSucesso();

    excluirConta();
    verificarSeContaFoiExcluida();
    clicarEmContinuar();
  });
});
