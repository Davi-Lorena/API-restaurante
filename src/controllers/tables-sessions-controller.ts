// Importando ferramenteas necessárias
import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

// Criando a classe que contém os controllers dos métodos HTTP das sessões das mesas  
// Passando os parâmetros já com a tipagem: request, response e nextfunction(próxima função/execução)
// Adicionando um bloco de trycatch em cada controller para lidar com possíveis erros em que a "próxima função" seria receber o erro como parâmetro para lidar com ele 
class TablesSessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
try {
    // Fazendo a verificação com o bodySchema 
    const bodySchema = z.object({
        table_id: z.number(),
    })

    // Passando o que será validado para o bodySchema-> parse(request.body)
const { table_id } = bodySchema.parse(request.body)

// Select pode estar implícito, como abaixo 
// A const abaixo abre a mesa que contém o id (a única, first)
const session = await knex<TablesSessionsRepository>("tables_sessions").where({table_id}).orderBy("opened_at").first()

// Verificando se existe a mesa e se ela ainda não foi fechada 
if(session && !session.closed_at) {
    throw new AppError("This table is already open")
}

// Inserimos o id da mesa e a abrimos 
await knex<TablesSessionsRepository>("tables_sessions").insert({
    table_id,
    opened_at: knex.fn.now() // Essa função captura a data e hora atuais 
})

    return response.status(201).json()
} catch (error) {
    next(error)
}
    }

    async index(request: Request, response: Response, next: NextFunction) {
try {

    // Select omitido novamente.
    // Ordenamos as mesas de acordo com o horário de fechamento 
    const sessions = await knex<TablesSessionsRepository>("tables_sessions").orderBy("closed_at")
    // As retornamos para exibição 
    return response.json(sessions)
} catch (error) {
    next(error)
}
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            // Validamos se o id é mesmo um número
            const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), { message: "id must be a number"}).parse(request.params.id)

            // Capturamos a mesa que contém o respectivo id (a única)
const session = await knex<TablesSessionsRepository>("tables_sessions").where({ id }).first()

// Verificamos se a mesa existe 
if (!session) {
    throw new AppError("Session not found")
}

// Verificamos se a mesma já não está fechada 
if(session.closed_at) {
     throw new AppError("This session table is already close")
}

// Fechamos a mesa a atualizando. 
await knex<TablesSessionsRepository>("tables_sessions").update({ closed_at: knex.fn.now() }).where({ id })

return response.json()
        } catch (error) {
            next(error)
        }
    }

}

// Exportando a classe
export { TablesSessionsController }