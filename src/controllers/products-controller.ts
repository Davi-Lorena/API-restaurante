// Importando ferramenteas necessárias
import { NextFunction, Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { knex } from "@/database/knex"

import { z } from "zod"

// Criando a classe que contém os controllers dos métodos HTTP dos produtos  
// Passando os parâmetros já com a tipagem: request, response e nextfunction(próxima função/execução)
// Adicionando um bloco de trycatch em cada controller para lidar com possíveis erros em que a "próxima função" seria receber o erro como parâmetro para lidar com ele 
class ProductController {
    async index(request: Request, response: Response, next: NextFunction) {
try {
    // Capturamos o nome da query da requisição 
    const { name } = request.query

    // Criamos a const para receber as informações dos produtos e em relação ao nome, desconsideramos espaços vazios e retornamos uma string vazia, caso ele não esteja definido. 
const products = await knex<ProductRepository>("products").select().whereLike("name", `%${name ?? ""}%`).orderBy("name")

// Retornamos os produtos
    return response.json(products)
} catch (error) {
    next(error)
}
    }

async create(request: Request, response: Response, next: NextFunction) {
try {

    // Fazemos a validação com bodySchema, por meio do ZOD (z.object())
     const bodySchema = z.object({
name: z.string().trim().min(6), // name deve ser string, desconsiderar os espaços vazios e ter no mínimo 6 dígitos 
price: z.number().gt(0), // price deve ser número e maior que zero 
     })

     // Agora, passamod para o bodySchema o name e o price vindos de parse(request.body)
     const { name, price } =bodySchema.parse(request.body)

     // Generic -> Não precisou ser importado pois o arquivo de tipagem só contém tipos primitivos (o que o deixa disponível globalmente)
     // Inserimos na tabela de produtos o nome e o preço 
await knex<ProductRepository>("products").insert({ name, price })

// Retornamos o status de 201 -> criado 
    return response.status(201).json()
    
} catch (error) {
    next(error)
}
}

async update(request: Request, response: Response, next: NextFunction){
try {
    // Na linha abaixo, garantimos que o id vindo de parse(request.params.id) seja um búmero 
const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "id must be a number"}).parse(request.params.id)

// Validação com ZOD novamente 
const bodySchema = z.object({
name: z.string().trim().min(6),
price: z.number().gt(0),
     })

     // Recebendo da request.body name e price para validação 
const { name, price } = bodySchema.parse(request.body)

// Selecionando pelo id (o único)
const product = await knex<ProductRepository>("products").select().where({ id }).first()

// Verificando se o produto existe 
    if(!product) {
throw new AppError("Product not found")
    }

    // Fazendo a atualização dos dados do produto. 
await knex<ProductRepository>("products").update({ name, price, updated_at: knex.fn.now() }).where({ id })

    return response.json()
} catch (error) {
    next(error)
}
}

async remove(request: Request, response: Response, next: NextFunction) {
try {
    // Na linha abaixo, garantimos que o id vindo de parse(request.params.id) seja um búmero 

    const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value), {message: "id must be a number"}).parse(request.params.id)

// Selecionando pelo id (o único)

    const product = await knex<ProductRepository>("products").select().where({ id }).first()

// Verificando se o produto existe 

    if(!product) {
throw new AppError("Product not found")
    }

    // Realizando a deleção de acordo com o id 
await knex<ProductRepository>("products").delete().where({ id })


    return response.json()
} catch (error) {
    next(error)
}
}

}

// Exportando a classe 
export {ProductController}