const express = require("express") //Iniciar o servidor, irá pedir o express e salvar nessa variável
const server = express()//Executar o express

//Pegar o banco de dados
const db = require("./database/db")

//Configuração da pasta public 
server.use(express.static("public")) //Configuração da pasta public para que apareça as paginas dentro dela

//Utilizando template engine
const nunjucks = require("nunjucks") //Pedindo uma depedencia ja instalado no npm
nunjucks.configure("src/views", { //Pasta de html para configurarmos
    express: server, //Ligamos o nunjucks ao express, dessa maneira as rotas funcionam: res.render("index.html")
    noCache: true//Sem cache
})

//Configuração das rotas/caminhos da aplicação
//Rota "Home", página inicial.
//req: Requisição
//res: Resposta
server.get("/", (req, res) => { //Get é um verbo de http 
    //Antes de instalar o nunjucks:
    //res.sendFile(__dirname + "/views/index.html") //dirname é o nome do diretório
    //Após instalação do nunjucks, trocamos por render e como já le arquivos html, deixamos como string:
    return res.render("index.html", { title: "Um título" })//o "res" entende que irá passar pelo motor do nunjucks o index.html e irá retornar/o 2ªelement é 1 objeto    
})

//Rota que irá receber dados do formulário, através do req /Create-point:
server.get("/create-point", (req, res) => {
    //req.query: Query Strings da nossa URL e consegue pegar as informações que estão la
    console.log(req.query)

    

    //Antes de instalar o nunjucks:
    //res.sendFile(__dirname + "/views/create-point.html")
    //Após instalação do nunjucks, trocamos por render e como já le arquivos html, deixamos como string:
    return res.render("create-point.html")
})

//Rota /Search-results
server.get("/search", (req, res) => {
    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) { //Esse é o tratamento do caminho do erro
            return console.log(err)
        }
        const total = rows.length
        //Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
    //return res.render("search-results.html")->colocamos dentro do código acima
})

//ligar o servidor
server.listen(3000)