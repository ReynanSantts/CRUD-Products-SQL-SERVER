const {conectar} = require('./config/database')
const express = require('express')
const produtoRoutes = require('./routes/produtoRoutes')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(produtoRoutes)
async function iniciarServer() {
    try{
        await conectar()
        console.log('Banco de dados pronto')
        app.listen(PORT, () =>{
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    }
    catch(erro){
        console.error('Falha ao inicar', erro.message)
    }
}

iniciarServer()