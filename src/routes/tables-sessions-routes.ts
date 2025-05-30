// Importamos o Router e os controllers das rotas de produto
import { Router } from "express"
import { TablesSessionsController } from "@/controllers/tables-sessions-controller"

// Criamos uma constante para receber o Router 

const tablesSessionsRoutes = Router()

// Criamos uma constante para receber uma instância da classe que contém os controllers 

const tablesSessionsController = new TablesSessionsController()

// Utilizamos o Router para acessar o caminho e passamos o método de controller desejado para cada HTTP method

tablesSessionsRoutes.post("/", tablesSessionsController.create)
tablesSessionsRoutes.get("/", tablesSessionsController.index)
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update)

// Exportamos os métodos para serem chamados no index.ts das routes 

export { tablesSessionsRoutes }