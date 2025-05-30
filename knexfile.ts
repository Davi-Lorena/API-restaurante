// Esse arquivo é utilizado para a condiguração do query builder KNEX 

export default {
    // Banco de dados que será utilizado: 
    client: "sqlite3",
    // Caminho do arquivo do nosso banco de dados: 
    connection: {
        filename: "./src/database/database.db",   
    },
    // 
    pool: {
        afterCreate: (connection: any, done: any) => {
            connection.run("PRAGMA foreign_keys = ON")
            done()
        }
    },
    // Propriedade especial para trabalhar com valores nulos: 
useNullAsDefault: true, 
// Migrações(Utilizadas para criar tabelae e colunas): extensão dos arquivos e caminho do diretório
migrations: {
    extensions: "ts",
    directory: "./src/database/migrations"
},

// Seeds(Utilizadas para popular tabelas e preencher propriedades das colunas): extensão dos arquivos e caminho do diretório
seeds: {
    extensions: "ts",
    directory: "./src/database/seeds"
}

}