export async function up(knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");

    table
      .uuid("product_id")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table.integer("rating").notNullable();

    table.text("comment");

    table
      .enum("status", ["pending", "approved", "rejected"])
      .notNullable()
      .defaultTo("pending");

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("reviews");
}
