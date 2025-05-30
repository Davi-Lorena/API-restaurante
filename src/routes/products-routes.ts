// Importamos o Router e os controllers das rotas de produto
import { Router } from "express"
import { ProductController } from "@/controllers/products-controller"

// Criamos uma constante para receber o Router 
const productsRoutes = Router()
// Criamos uma constante para receber uma instância da classe que contém os controllers 
const productsController = new ProductController()

// Utilizamos o Router para acessar o caminho e passamos o método de controller desejado para cada HTTP method
productsRoutes.get("/", productsController.index)
productsRoutes.post("/", productsController.create)
productsRoutes.put("/:id", productsController.update)
productsRoutes.delete("/:id", productsController.remove)

// Exportamos os métodos para serem chamados no index.ts das routes 
export { productsRoutes }