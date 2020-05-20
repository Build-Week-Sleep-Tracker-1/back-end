const db = require('../data/config')
const bcrypt = require('bcryptjs')

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
    return db('users').where({id}).first()
}

async function add(user) {
    const rounds = process.env.HASHING_ROUNDS || 12
    user.password = await bcrypt.hash(user.password, rounds)
    const [id] = await db('users').insert(user)
    return findById(id)
}

async function update(id, updates) {
    await db('users').where({id}).update(updates)
    return findById(id)
}

function remove(id) {
    return db('users').where({id}).del()
}

module.exports = {
    find,
    findBy,
    findById,
    update,
    add,
    remove,
}
