export async function up(knex) {
  return knex.schema.createTable("payments", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table
      .uuid("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");

    table.decimal("amount", 10, 2).notNullable();

    table
      .enum("method", [
        "credit_card",
        "paypal",
        "bank_transfer",
        "cash_on_delivery",
      ])
      .notNullable();

    table
      .enum("status", ["pending", "completed", "failed", "refunded"])
      .notNullable()
      .defaultTo("pending");

    table.string("transaction_id").unique();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("payments");
}
