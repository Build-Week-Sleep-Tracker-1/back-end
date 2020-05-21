
exports.up = async function(knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id')
        table.text('username').unique().notNull()
        table.text('password').notNull()
        table.text('name').notNull()
        table.integer('age').notNull()
    })

    await knex.schema.createTable('entries', table => {
        table.increments('id')
        table.text('date').notNull()
        table.text('sleep_start').notNull()
        table.text('sleep_end').notNull()
        table.decimal('total_time').notNull()
        table.integer('mood_score').notNull()
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users')
    await knex.schema.dropTableIfExists('entries')
};
