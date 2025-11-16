export async function up(knex) {
  return knex.schema.createTable("categories", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("name").notNullable().unique();

    table.text("description");

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("categories");
}
