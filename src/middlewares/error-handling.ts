// Importatemos abaixo os tipos]: Requisição, resposta e próxima função, do express, nosso AppError (que lida com erros do nosso programa), e o ZodError (que lida com erros do ZOD -> que é utilizado para fazer a SCHEMA VALIDATION, uma validação mais econômica e completa dos dados tratados na API )  

import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/AppError"
import { ZodError } from "zod"

// Exportamos a função errorHandling e destaco o "_" que recebe o tipo NextFunction, que não será acionado, pois se houver algum erro não haverá uma "próxima execução"
export function errorHandling(error: any, request: Request, response: Response, _: NextFunction) {

    // Tratamento para caso o erro ser uma instância de app error 
if(error instanceof AppError) {
    return response.status(error.statusCode).json({message: error.message})
}

// Tratamento para caso o erro seja uma instância do ZodError 
if(error instanceof ZodError) {
    return response.status(400).json({ message: "validation error", issues: error.format()})
}

// Tratamento para caso o erro não se encaixe em nenhum dos dois acima e, portanto, seja um erro de status 500 (falha no servidor)
return response.status(500).json({ message: error.message })

}