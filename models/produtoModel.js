const { conectar, sql } = require("../config/database");

async function listarProdutos() {
  try {
    const conexao = await conectar();
    const resultado = await conexao
      .request()
      .query("SELECT * FROM TabelaProdutos");

    console.log("RESULTADO DO GET:", resultado);
    return resultado.recordset;
  } catch (erro) {
    console.error("Erro ao listar Produtos", erro.message);
    throw erro;
  }
}

async function cadastrarProduto(produto) {
  try {
    const conexao = await conectar();
    const resultado = await conexao
      .request()
      .input("nome", sql.VarChar(100), produto.nome.trim())
      .input("preco", sql.Decimal(10, 2), produto.preco)
      .input("quantidade", sql.Int, produto.quantidade)
      .query(
        "INSERT INTO tabelaProdutos (nome,preco,quantidade) OUTPUT INSERTED.* VALUES (@nome,@preco,@quantidade)",
      );

    return resultado.recordset[0];
  } catch (erro) {
    console.error("Erro ao cadastrar produto:", erro.message);
    throw erro;
  }
}

async function verificarNomeExistente(nome) {
  try {
    const conexao = await conectar();

    const resultado = await conexao
      .request()
      .input("nome", sql.VarChar(100), nome.trim())
      .query("SELECT ID FROM tabelaProdutos WHERE nome = @nome");

    return resultado.recordset.length > 0;
  } catch (erro) {
    console.error("Erro ao verificar nome:", erro.message);
    throw erro;
  }
}

async function buscarProdutoPorId(id) {
  try {
    const conexao = await conectar();
    const resultado = await conexao
      .request()
      .input("id", sql.Int, id)
      .query("select * from tabelaProdutos where id = @id");

    return resultado.recordset[0];
  } catch (erro) {
    console.error("Erro ao buscar produto por ID", erro.message);
    throw erro;
  }
}

async function atualizarProduto(id, produto) {
  try {
    const conexao = await conectar();
    const resultado = await conexao
      .request()
      .input("id", sql.Int, id)
      .input("nome", sql.VarChar(100), produto.nome.trim())
      .input("preco", sql.Decimal(10, 2), produto.preco)
      .input("quantidade", sql.Int, produto.quantidade)
      .query(
        "update tabelaProdutos set nome = @nome, preco = @preco, quantidade = @quantidade output inserted.* where id = @id",
      );

    return resultado.recordset[0];
  } catch (erro) {
    console.error("Erro ao atualizar produto", erro.message);
    throw erro;
  }
}

async function verificarNomeDuplicado(nome, id) {
  try {
    const conexao = await conectar();
    const resultado = await conexao
      .request()
      .input("id", sql.Int, id)
      .input("nome", sql.VarChar(100), nome.trim())
      .query("select id from tabelaProdutos where nome = @nome and id <> @id");

    return resultado.recordset.length > 0;
  } catch (erro) {
    console.error("Erro ao verificar nome duplicado:", erro.message);
    throw erro;
  }
}

async function deletarProduto(id) {
  try {
    const conexao = await conectar();
    const resultado = await conexao
      .request()
      .input("id", sql.Int, id)
      .query("delete from tabelaProdutos where id = @id");
    return resultado.rowsAffected[0]
  } catch (erro) {
    console.error("Erro ao deletar produto:", erro.message);
    throw erro;
  }
}

module.exports = {
  listarProdutos,
  cadastrarProduto,
  verificarNomeExistente,
  buscarProdutoPorId,
  atualizarProduto,
  verificarNomeDuplicado,
  deletarProduto
};
