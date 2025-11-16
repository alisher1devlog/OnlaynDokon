/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("products", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("name").notNullable();

    table.text("description");

    table
      .uuid("category_id")
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");

    table.decimal("price", 10, 2).notNullable();

    table.string("currency").notNullable().defaultTo("USD");

    table.integer("stock_quantity").notNullable().defaultTo(0);

    table.string("imge_url");

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("products");
}
