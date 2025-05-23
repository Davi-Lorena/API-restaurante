import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class TablesSessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
try {
    const bodySchema = z.object({
        table_id: z.number(),
    })

const { table_id } = bodySchema.parse(request.body)

// Select pode estar implícito, como abaixo 
const session = await knex<TablesSessionsRepository>("tables_sessions").where({table_id}).orderBy("opened_at").first()

if(session && !session.closed_at) {
    throw new AppError("This table is already open")
}

await knex<TablesSessionsRepository>("tables_sessions").insert({
    table_id,
    opened_at: knex.fn.now()
})

    return response.status(201).json()
} catch (error) {
    next(error)
}
    }

    async index(request: Request, response: Response, next: NextFunction) {
try {

    // Select omitido novamente.
    const sessions = await knex<TablesSessionsRepository>("tables_sessions").orderBy("closed_at")
    
    return response.json(sessions)
} catch (error) {
    next(error)
}
    }

}

export { TablesSessionsController }