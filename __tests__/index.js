const supertest = require('supertest')
const server = require('../index')
const db = require('../data/config')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('auth integration tests', () => {
    test('POST register', async () => {
        const res = await supertest(server)
        .post('/api/auth/register')
        .send({
            username: 'test',
            password: '123',
            name: 'testing',
            age: 100
        })
        expect(res.statusCode).toBe(201)
    })

    test('POST register (400)', async () => {
        const res = await supertest(server)
        .post('/api/auth/register')
        .send({
            username: 'test',
            password: '123',
            name: 'testing'
        })
        expect(res.statusCode).toBe(400)
    })

    test('POST login', async () => {
        const res = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'johndoe1',
            password: '123'
        })
        expect(res.statusCode).toBe(200)
    })

    test('POST login (wrong credentials)', async () => {
        const res = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'john',
            password: '123'
        })
        expect(res.statusCode).toBe(401)
    })
})

describe('user integration tests', () => {
    test('GET users', async () => {
        const res = await supertest(server)
        .get('/api/users')
        expect(res.statusCode).toBe(200)
    })

    test('GET useer', async () => {
        const res = await supertest(server)
        .get('/api/users/1')
        expect(res.statusCode).toBe(200)
        expect(res.body.username).toBe('johndoe1')
    })

    test('PUT user', async () => {
        const res1 = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'johndoe1',
            password: '123'
        })

        const res2 = await supertest(server)
        .put('/api/users/1')
        .set('authorization', res1.body.token)
        .send({
            name: 'changed'
        })

        expect(res2.body.name).toBe('changed') 
    })

    test('PUT user (unauthorized)', async () => {
        const res = await supertest(server)
        .put('/api/users/1')
        .send({
            name: 'changed'
        })

        expect(res.statusCode).toBe(401)
    })

    test('DELETE user', async () => {
        const res1 = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'johndoe1',
            password: '123'
        })

        const res2 = await supertest(server)
        .delete('/api/users/1')
        .set('authorization', res1.body.token)
        expect(res2.statusCode).toBe(204)
    })

    test('DELETE user (unauthorized)', async () => {
        const res = await supertest(server)
        .delete('/api/users/1')
        expect(res.statusCode).toBe(401)
    })
})

describe('user entries integration tests', () => {
    test('GET user entries', async () => {
        const res1 = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'johndoe1',
            password: '123'
        })

        const res2 = await supertest(server)
        .get('/api/users/1/entries')
        .set('authorization', res1.body.token)

        expect(res2.statusCode).toBe(200)
    })

    test('GET user entries (unauthorized)', async () => {
        const res = await supertest(server)
        .get('/api/users/1/entries')

        expect(res.statusCode).toBe(401)
    })

    test('POST user entry', async () => {
        const res1 = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'johndoe1',
            password: '123'
        })

        const res2 = await supertest(server)
        .post('/api/users/1/entries')
        .set('authorization', res1.body.token)
        .send({
            date: '01-01-2020',
            sleep_start: '11pm',
            sleep_end: '7am',
            total_time: 8,
            mood_score: 4
        })

        expect(res2.body.date).toBe('01-01-2020') 
    })

    test('PUT user entry', async () => {
        const res1 = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'johndoe1',
            password: '123'
        })

        const res2 = await supertest(server)
        .put('/api/users/1/entries/1')
        .set('authorization', res1.body.token)
        .send({
            date: '01-04-2020'
        })
        expect(res2.body.date).toBe('01-04-2020')
    })

    test('DELETE user entry', async () => {
        const res1 = await supertest(server)
        .post('/api/auth/login')
        .send({
            username: 'johndoe1',
            password: '123'
        })

        const res2 = await supertest(server)
        .delete('/api/users/1/entries/1')
        .set('authorization', res1.body.token)

        expect(res2.statusCode).toBe(204)
    })
})