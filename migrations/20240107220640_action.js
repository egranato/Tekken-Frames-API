/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("action", (t) => {
    t.increments("id");
    t.string("input").notNullable();
    t.string("properties").notNullable();
    t.string("damage").notNullable();
    t.string("startup").notNullable();
    t.string("blockFrames");
    t.string("hitFrames").notNullable();
    t.string("counterFrames").notNullable();
    t.boolean("tailSpin").defaultTo(false).notNullable();
    t.boolean("homing").defaultTo(false).notNullable();
    t.boolean("powerCrush").defaultTo(false).notNullable();
    t.boolean("heatOnly").defaultTo(false).notNullable();
    t.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("action");
};
