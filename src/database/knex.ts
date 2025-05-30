//Importamos o knex para utilizá-lo em nossa aplicação 
import {knex as knexConfig} from "knex"

// Importamos as configurações do arquivo knexfile, para utilizá-las aqui 
import config from "../../knexfile"

//Exportamos a constante knex que é basicamente "as configurações do knex sendo alteradas por aquelas que passamos"
export const knex = knexConfig(config)