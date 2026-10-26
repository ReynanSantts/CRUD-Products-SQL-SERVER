function validarProduto(produto) {
  const erros = [];

  if(produto === null || typeof produto !== "object" || Array.isArray(produto)){
    return ["Os dados do produto devem ser um objeto válido"]
  }

  //Validação para o campo nome
  if(typeof produto.nome !== 'string' || produto.nome.trim() === ""){
    erros.push("O nome é obrigatório e deve ser um texto")
  }
  else if(produto.nome.trim().length < 2){
    erros.push("O nome deve conter pelo menos 2 caracteres")
  }
  else if(produto.nome.trim().length > 100){
    erros.push("O nome deve conter no máximo 100 caracteres")
  }

  //Validação para o campo preço

  if(produto.preco == null || produto.preco === ""){
    erros.push("O preço é obrigatório")
  }
  else if(typeof produto.preco !=='number'|| !Number.isFinite(produto.preco) || produto.preco <= 0){
    erros.push("O preço deve ser um número positivo")
  }

  //Validação para o campo quantidade
  if(produto.quantidade == null || produto.quantidade === ""){
    erros.push("A quantidade é obrigatorio")
  }
  else if(!Number.isInteger(produto.quantidade) || produto.quantidade < 0){
    erros.push("A quantidade deve ser um número inteiro e não negativo")
  }

  return erros;
}

module.exports = { validarProduto };
