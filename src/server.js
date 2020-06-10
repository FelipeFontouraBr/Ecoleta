const express = require("express") //Iniciar o servidor, irá pedir o express e salvar nessa variável
const server = express()//Executar o express

//Configuração da pasta public 
server.use(express.static("public")) //Configuração da pasta public para que apareça as paginas dentro dela


//Configuração das rotas/caminhos da aplicação
//Rota "Home", página inicial.
//req: Requisição
//res: Resposta
server.get("/", (req, res) => { //Get é um verbo de http 
    res.sendFile(__dirname + "/views/index.html") //dirname é o nome do diretório
})

//ligar o servidor
server.listen(3000)