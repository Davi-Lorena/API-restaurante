// Abaixo, importaremos o express (utilizado para a criação de métodos HTTP e rotas), nossas rotas e o tratamento de erros 

import express from "express"
import { routes } from "./routes"
import { errorHandling } from "./middlewares/error-handling"

// Criamos uma constante para armazenar a porta na qual nossa API estará localizada 
// Nesse caso, criar uma constante facilita o uso dessa porta para outras funcionalidades 
const PORT = 3333

// criamos a constante app que recebe o expresse e tem seus métodos disponíveis 
const app = express()

//Chamamos o app.use() (que realiza "alguma coisa") para definir o tipo de arquivo que será utilizado -> JSON
app.use(express.json())
// Chamamos novamente o app.use() para acessar as rotas e seus métodos disponíveis 
app.use(routes)

// Chamamos o tratamento de erros (SEMPRE antes de abrir o servidor)
app.use(errorHandling)

// Por fim, o app.listen() passando como primeiro parâmetro o número da porta ou URL do servidor onde está a API e como segundo parâmetro uma função que pode retornar alguma coisa e no nosso caso foi apenas a confirmação de funcionamento do servidor e a porta em que isso está ocorrendo
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))