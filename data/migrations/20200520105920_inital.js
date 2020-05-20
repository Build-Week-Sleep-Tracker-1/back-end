
exports.up = async function(knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id')
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users')
};
