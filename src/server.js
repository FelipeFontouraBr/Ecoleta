const express = require("express") //Iniciar o servidor, irá pedir o express e salvar nessa variável
const server = express()//Executar o express

//Pegar o banco de dados
const db = require("./database/db")

//Configuração da pasta public (.use é para isso, fazer a configuração)
server.use(express.static("public")) //Configuração da pasta public para que apareça as paginas dentro dela

//O express não roda o campo body da page, portanto:
//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

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
    //console.log(req.query)

    //Antes de instalar o nunjucks:
    //res.sendFile(__dirname + "/views/create-point.html")
    //Após instalação do nunjucks, trocamos por render e como já le arquivos html, deixamos como string:
    return res.render("create-point.html")
})
//Usando o verbo POST e trocamos o caminho para savepoint ao inves de /create-point
server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulário
    //console.log(req.body)

    //Inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image, 
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name, 
        req.body.address, 
        req.body.address2, 
        req.body.state, 
        req.body.city, 
        req.body.items 
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this) 

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
})

//Rota /Search-results
server.get("/search", (req, res) => {

    //Ver pontos cadastrados
    const search = req.query.search
    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }


    //Pegar os dados do banco de dados
    //Antes era: ity = '${search}', mas pega o valor correto digitado na cidade (tipo, Rio de Janeiro, se colocar só Rio não vai), então mudamos para "city LIKE '%${search}%'" pode vir um valor antes ou depois do 'Rio' que esta correto
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) { //Esse é o tratamento do caminho do erro
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        const total = rows.length
        //Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
    //return res.render("search-results.html")->colocamos dentro do código acima
})

//ligar o servidor
server.listen(3000)