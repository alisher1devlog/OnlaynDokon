export async function up(knex) {
  return knex.schema.createTable("order_details", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table
      .uuid("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");

    table
      .uuid("product_id")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table.integer("quantity").notNullable().defaultTo(1);

    table.decimal("unit_price", 10, 2).notNullable();

    table.decimal("total_price", 10, 2).notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("order_details");
}
