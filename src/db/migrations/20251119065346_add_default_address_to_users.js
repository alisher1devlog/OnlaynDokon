export async function up(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("address").nullable();
  });
}

export async function down(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("address");
  });
}
