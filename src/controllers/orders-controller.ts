import { NextFunction, Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { knex } from "@/database/knex"

import { z } from "zod"

class OrdersController {
async create(request: Request, response: Response, next: NextFunction) {
    try {
        const bodySchema = z.object({
            table_sessions_id: z.number(),
            product_id: z.number(),
            quantity: z.number()

        })

        const {table_sessions_id, product_id, quantity} = bodySchema.parse(request.body) 

        const session = await knex<TablesSessionsRepository>("tables_sessions").where({ id: table_sessions_id }).first()

        if(!session) {
            throw new AppError("session table not found")
        }

        if(session.closed_at) {
            throw new AppError("this table is closed")
        }

const product = await knex<ProductRepository>("products").where({ id: product_id }).first()

if(!product){
    throw new AppError("product not found")
}

await knex<OrderRepository>("orders").insert({
    table_sessions_id,
    product_id,
    quantity,
    price: product.price,
})

        return response.status(201).json()
    } catch (error) {
        next(error)
    }
}

}

export { OrdersController }