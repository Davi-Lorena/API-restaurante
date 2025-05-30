// Arquivos com .d.ts de extensão representam tipos que serão utilizados para as colunas de tabelas via knex
// Tipagem criada para os produtos
type ProductRepository = {
    id:number
    name:string
    price:number
    created_at: number
    updated_at: number
}