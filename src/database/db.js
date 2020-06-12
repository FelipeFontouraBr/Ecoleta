//Configuração do nosso banco de dados
//Importar a depedencia do sqlite3, e irá retornar um objeto:
//Dica: uma função dentro de um objeto se chama METODO
const sqlite3 = require("sqlite3").verbose() //Verbose: quero ver uma mensagem no terminal toda vez que acontecer algo e retorna um objeto

//Criar o objeto que irá fazer operações no Banco de Dados:
//NEW inicia um novo objeto dentro de uma classe
const db = new sqlite3.Database("./src/database/database.db")