// Criaremos uma classe que será exportada e instanciada caso surja um erro nesse padrão 

class AppError {
    message: string 
    statusCode: number

    // O status code de 400 indica uma requisição inválida 
    constructor(message: string, statusCode: number = 400) {
        this.message = message 
        this.statusCode = statusCode
    }
}

export { AppError }