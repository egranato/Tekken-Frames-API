/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('character').del()
  await knex('character').insert([
    { name: 'Alisa' },
    { name: 'Asuka' },
    { name: 'Azucena' },
    { name: 'Bryan' },
    { name: 'Claudio' },
    { name: 'Devil Jin' },
    { name: 'Dragunov' },
    { name: 'Feng' },
    { name: 'Hwoarang' },
    { name: 'Jack-8' },
    { name: 'Jin' },
    { name: 'Jun' },
    { name: 'Kazuya' },
    { name: 'King' },
    { name: 'Kuma' },
    { name: 'Lars' },
    { name: 'Law' },
    { name: 'Lee' },
    { name: 'Leo' },
    { name: 'Leroy' },
    { name: 'Lili' },
    { name: 'Nina' },
    { name: 'Panda' },
    { name: 'Paul' },
    { name: 'Raven' },
    { name: 'Reina' },
    { name: 'Shaheen' },
    { name: 'Steve' },
    { name: 'Victor' },
    { name: 'Xiaoyu' },
    { name: 'Yoshimitsu' },
    { name: 'Zafina' },
  ]);
};
