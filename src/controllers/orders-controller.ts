// Importando ferramenteas necessárias
import { NextFunction, Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { knex } from "@/database/knex"

import { z } from "zod"

// Criando a classe que contém os controllers dos métodos HTTP das ordens 
// Passando os parâmetros já com a tipagem: request, response e nextfunction(próxima função/execução)
// Adicionando um bloco de trycatch em cada controller para lidar com possíveis erros em que a "próxima função" seria receber o erro como parâmetro para lidar com ele 
class OrdersController {
async create(request: Request, response: Response, next: NextFunction) { 
    try {
        // Criando a const bodSchema para validar as entradas com o ZOD (z.object() trabalha as validações)
        const bodySchema = z.object({
            // z.number() indica que todas as requests devem ser números 
            table_sessions_id: z.number(),
            product_id: z.number(),
            quantity: z.number()

        })

        // Aqui nós desestruturamos os parâmetros da requisição que queremos validar e os passamos, por meio do parse(request.body), para o bodySchema realizar a validação 
        const {table_sessions_id, product_id, quantity} = bodySchema.parse(request.body) 

        // Com a const abaixo, capturamos a session e aguardamos os métodos knex (com a tipagem de table sessions definida para fazer verificações que necessitam dessa tipagem, afinal, verificaremos se a session existe ou não e se está fechada), where(para especificar com o id da session) e first(para capturar a única) 
        const session = await knex<TablesSessionsRepository>("tables_sessions").where({ id: table_sessions_id }).first()

        //Verificando se existe a session 
        if(!session) {
            throw new AppError("session table not found")
        }

        // verificando se não está fechada 
        if(session.closed_at) {
            throw new AppError("this table is closed")
        }

// Com a const abaixo, faremos a mesma verificação da session para o product, para verificar se ele existe. O type product é passado para o knex, pois estamos tratando dos produtos 
const product = await knex<ProductRepository>("products").where({ id: product_id }).first()

// Verificando se existe product
if(!product){
    throw new AppError("product not found")
}

// Por fim, inserimos na nossa tabela a ordem com o id da session, do produto, a quantidade dos produtos e o preço. 
await knex<OrderRepository>("orders").insert({
    table_sessions_id,
    product_id,
    quantity,
    price: product.price,
})
// Retornamos que deu certo
        return response.status(201).json()
    } catch (error) {
        next(error)
    }
}

async index(request: Request, response: Response, next: NextFunction) {
    try {
        // Capturamos o id da session dos parâmetros da requisição 
        const { table_sessions_id } = request.params

        // Nas linhas abaixo, basicamente selecionamos o que queremos exibir e como queremos. Escrevendo: 
        /* Da tabela "orders", quero selecionar o id, o table_sessions_id e o product.id. Da tabela "products", quero selecionar o name, o price e a quantity. Utilizamos o raw para escrever em SQL que a multiplicação entre o price x quantity deve ser realizada e chamada de total. Com o join, faremos a conexão entre o products.id e orders.product_id. Tudo isso onde está o respectivo "table_sessions_id" e ordenando em ordem decrescente de acordo com orders.created_at*/
        const order = await knex("orders").select("orders.id", "orders.table_sessions_id", "orders.product_id", "products.name","orders.price", "orders.quantity", knex.raw("(orders.price * orders.quantity) AS total"), "orders.created_at", "orders.updated_at").join("products", "products.id", "orders.product_id"
        ).where({ table_sessions_id }).orderBy("orders.created_at", "desc")

        //Retornamos a constante acima, tendo em vista que essa método é para exibição
        return response.json(order)
    } catch (error) {
        next(error)
    }
}

async show(request: Request, response: Response, next: NextFunction){
    try {
        // Capturamos o id da session dos parâmetros da requisição 
const { table_sessions_id } = request.params

// Calculamos o total da conta, exibindo "0" caso não haja nada. 
const order = await knex("orders").select(knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total")).where({ table_sessions_id }).first()

// retornando esse total 
        return response.json(order)
    } catch (error) {
        next(error)
    }
}

}

// Exportamos a classe 
export { OrdersController }