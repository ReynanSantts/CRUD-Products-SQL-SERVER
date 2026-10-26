const express = require('express')
const router = express.Router()
const {buscarProdutos, postProdutos, getprodutosPorId, putProdutos,deleteProdutos} = require('../controllers/produtoController')


router.get('/produtos', buscarProdutos)
router.post('/produtos', postProdutos)
router.get('/produtos/:id', getprodutosPorId)
router.put('/produtos/:id', putProdutos)
router.delete('/produtos/:id', deleteProdutos)

module.exports = router