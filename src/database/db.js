//Configuração do nosso banco de dados
//Importar a depedencia do sqlite3, e irá retornar um objeto:
//Dica: uma função dentro de um objeto se chama METODO
const sqlite3 = require("sqlite3").verbose() //Verbose: quero ver uma mensagem no terminal toda vez que acontecer algo e retorna um objeto

//Criar o objeto que irá fazer operações no Banco de Dados:
//NEW inicia um novo objeto dentro de uma classe
const db = new sqlite3.Database("./src/database/database.db") //Irá criar um banco de dados no caminho que esta entre ()

//Utilizar o objeto de banco de dados para nossas operações
db.serialize(() => { //Ira rodar uma sequencia de códigos - db é um objeto

    //com comandos sql:
    //1-Criar uma tabela: (abaixo é um tamplate litius)
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );    
    `)

    //2-Inserir dados na tabela 
    //Primeiro coloca os campos "places ()" e depois os valores "values ()"
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    //afterInsertData é uma callback
    db.run(query, values, afterInsertData)


    //3-Consultar os dados da tabela PLACES (* -> significa acessar todos os campos da tabela)
    //Se fosse trazer só os nomes does registros:  db.all(`SELECT name FROM places`, function(err, rows)
    //db.all(`SELECT * FROM places`, function(err, rows){
    //    if(err) { //Esse é o tratamento do caminho do erro
    //        return console.log(err)
    //    }
    //    console.log("Aqui estão seus registros: ")
    //    console.log(rows)
    //})

    //4-Deletar um dado da tabela
    //Quando se usa uma ?, será colocado uma sequencia de interrogações. Nesse caso o valor dela é 1, pois só há um registro e o id é 1
    //Explicação: Irá deletar da tabela onde o id é 1, e depois rodar um função callback para tratar erro
    //Para deletar algum dado, basta adicionar o id que quer deletar
    //db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    //  if(err) { 
    //        return console.log(err)
     //   }
    //    console.log("Registro deletado com sucesso!")
       }) 
