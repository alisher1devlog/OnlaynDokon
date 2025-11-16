export async function up(knex) {
  return knex.schema.createTable("orders", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");

    table.timestamp("order_date").notNullable().defaultTo(knex.fn.now());

    table
      .enum("status", [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "canceled",
      ])
      .notNullable()
      .defaultTo("pending");

    table.decimal("total_amount", 10, 2).notNullable().defaultTo(0.0);

    table.string("shipping_address").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("orders");
}
