const express = require("express") //Iniciar o servidor, irá pedir o express e salvar nessa variável
const server = express()//Executar o express

//Configuração das rotas/caminhos da aplicação
//Rota "Home", página inicial.
//req: Requisição
//res: Resposta
server.get("/", (req, res) => { //Get é um verbo de http 
    res.send("Olá Felipe")
})

//ligar o servidor
server.listen(3000)