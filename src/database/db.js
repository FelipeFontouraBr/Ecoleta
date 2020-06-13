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
    db.run(`
            INSERT INTO places (
                image, 
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES ();
    `)

    //3-Consultar os dados da tabela

    //4-Deletar um dado da tabela
}) 