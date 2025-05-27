import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("orders", (table) => {
        table.increments("id").primary(),
        table.integer("table_sessions_id").notNullable().references("id").inTable("tables_sessions"),
        table.integer("product_id").notNullable().references("id").inTable("products"),

        table.integer("quantity").notNullable(),
        table.decimal("price").notNullable(), //Aqui, devemos gerar um novo decimal para o preço com a inteção de que, se o preço for alterado futuramente, o valor de determinada mesa antes dessa alteração não seja alterado. O usuário não precisará informar 
        table.timestamp("created_at").defaultTo(knex.fn.now()),
        table.timestamp("updated_at").defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("orders")
}

