const supertest = require('supertest')
const server = require('../index')
const db = require('../data/config')
const usersModel = require('../models/users-model')
const entriesModel = require('../models/entries-model')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('auth integration tests', () => {
    test('POST register', async () => {
        const res = await supertest(server).post('/api/auth/register').send({
            username: 'test',
            password: '123',
            name: 'testing',
            age: 100
        })
        expect(res.statusCode).toBe(201)
    })

    test('POST register (400)', async () => {
        const res = await supertest(server).post('/api/auth/register').send({
            username: 'test',
            password: '123',
            name: 'testing'
        })
        expect(res.statusCode).toBe(400)
    })

    test('POST login', async () => {
        const res = await supertest(server).post('/api/auth/login').send({
            username: 'johndoe1',
            password: '123'
        })
        expect(res.statusCode).toBe(200)
    })

    test('POST login (wrong credentials)', async () => {
        const res = await supertest(server).post('/api/auth/login').send({
            username: 'john',
            password: '123'
        })
        expect(res.statusCode).toBe(401)
    })
})

