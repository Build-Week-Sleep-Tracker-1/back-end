
exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert([
    {
      username: 'johndoe1',
      password: '123',
      name: 'john doe',
      age: 28
    },
    {
      username: 'janedoe2',
      password: '123',
      name: 'jane doe',
      age: 28
    },
    {
      username: 'mattjohnson3',
      password: '123',
      name: 'matt johnson',
      age: 22
    }
  ])
};
