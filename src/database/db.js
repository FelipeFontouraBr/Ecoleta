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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos Lâmpadas"
    ]
    db.run(query, values, function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    })

    //3-Consultar os dados da tabela

    //4-Deletar um dado da tabela
}) 