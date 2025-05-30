// Importando ferramenteas necessárias
import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex"


// Criando a classe que contém os controller do único método HTTP para as mesas: index. 
// Passando os parâmetros já com a tipagem: request, response e nextfunction(próxima função/execução)
// Adicionando um bloco de trycatch em cada controller para lidar com possíveis erros em que a "próxima função" seria receber o erro como parâmetro para lidar com ele 
class TablesController {
async index(request: Request, response: Response, next: NextFunction){
try {
    // Selecionamos a tabela de mesas e a selecioamos ordenando as mesas de acordo com o número.
    const tables = await knex<TableRepository>("tables").select().orderBy("table_number")

    // Retornando as mesas 
return response.json(tables)
} catch (error) {
    next(error)
}


}

}

// Exportando a classe 
export { TablesController }