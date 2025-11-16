export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("email").notNullable().unique();

    table.string("username").notNullable().unique();

    table.string("password").notNullable();

    table
      .enum("role", ["customer", "seller", "admin"])
      .notNullable()
      .defaultTo("customer");

    table
      .enum("status", ["active", "inactive"])
      .notNullable()
      .defaultTo("inactive");

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
