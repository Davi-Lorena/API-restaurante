// Importamos o Router, que gerenciará nossas rotas 
import { Router } from "express"

// Importamos as rotas de cada tabela que temos no nosso banco de dados 
import { productsRoutes } from "./products-routes"
import { tablesRoutes } from "./tables-routes"
import { tablesSessionsRoutes } from "./tables-sessions-routes"
import { ordersRoutes } from "./orders-routes"

// A constante routes recebe o Router e ele será utilizado nas rotas da nossa API 
const routes = Router()
// Utilizamos o route.use() para passar o endereço final que queremos acessar e de onde as rotas estão vindo 
routes.use("/products", productsRoutes)
routes.use("/tables", tablesRoutes)
routes.use("/tables-sessions", tablesSessionsRoutes)
routes.use("/orders", ordersRoutes)

// Exportamos as rotas para utilizá-las no nosso server.ts
export { routes }