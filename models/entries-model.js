const db = require('../data/config')
const bcrypt = require('bcryptjs')

function find() {
    return db('entries')
}

function findBy(filter) {
    return db('entries').where(filter).first()
}

function findById(id) {
    return db('entries').where({id}).first()
}

function findByUserId(id) {
    return db('entries').where('user_id', id)
}

async function add(entry) {
    const [id] = await db('entries').insert(entry)
    return findById(id)
}

async function update(id, updates) {
    await db('entries').where({id}).update(updates)
    return findById(id)
}

function remove(id) {
    return db('entries').where({id}).del()
}

module.exports = {
    find,
    findBy,
    findById,
    findByUserId,
    update,
    add,
    remove,
}
