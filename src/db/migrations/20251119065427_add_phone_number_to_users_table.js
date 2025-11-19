export async function up(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("phone_number").unique().nullable();
  });
}

export async function down(knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("phone_number");
  });
}
