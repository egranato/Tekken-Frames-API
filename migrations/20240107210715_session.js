/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("session", (t) => {
    t.increments("id");
    t.integer("userId").notNullable();
    t.boolean("valid").defaultTo(true);
    t.string("userAgent");
    t.timestamps(true, true);

    t.foreign("userId").references("id").inTable("user");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("session");
};
