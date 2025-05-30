// Arquivos com .d.ts de extensão representam tipos que serão utilizados para as colunas de tabelas via knex
// Tipagem criada para as sessões de mesas
type TablesSessionsRepository = {
    id: number
    table_id: number 
    opened_at: number 
    closed_at: number
}