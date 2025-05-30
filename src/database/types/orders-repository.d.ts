// Arquivos com .d.ts de extensão representam tipos que serão utilizados para as colunas de tabelas via knex
// Tipagem criada para as ordens
type OrderRepository = {
    id: number,
    table_sessions_id: number, 
    product_id: number, 
    quantity: number,
    price: number, 
    created_at: number,
    updated_at: number
}