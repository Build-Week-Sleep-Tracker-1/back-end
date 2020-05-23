const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersModel = require('../models/users-model')
const entriesModel = require('../models/entries-model')
const router = express.Router()

router.post('/register', validBody(), async (req, res, next) => {
    try {
        const credentials = req.body

        const userExists = await usersModel.findBy({ username: credentials.username})
        if(userExists) {
            return res.status(400).json({
                message: 'that username already exists'
            })
        }

        const formatUser = {
            username: credentials.username,
            password: credentials.password,
            name: credentials.name,
            age: credentials.age
        }

        const newUser = await usersModel.add(formatUser)
        res.status(201).json(newUser)


    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    const authErr = {
        message: 'invalid credentials'
    }

    try {
        if(!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: 'request body needs a username and password'
            })
        }

        const user = await usersModel.findBy({ username: req.body.username })
        if(!user) {
            return res.status(401).json(authErr)
        }

        const validPassword = bcrypt.compare(req.body.password, user.password)
        if(!validPassword) {
            return res.status(401).json(authErr)
        }

        const tokenPayload = {
            userId: user.id
        }

        const userEntries = await entriesModel.findByUserId(user.id)

        const userToken = jwt.sign(tokenPayload, process.env.JWT_SECRET)
        res.json({
            message: `welcome ${user.username}`,
            token: userToken,
            userId: user.id,
            name: user.name,
            age: user.age,
            entries: userEntries
        })

    } catch(err) {
        next(err)
    }
})

function validBody() {
    return (req, res, next) => {
        if(!req.body.username || !req.body.password || !req.body.name || !req.body.age) {
            return res.status(400).json({
                message: 'request body needs username, password, name, and age'
            })
        }
        next()
    }
}

module.exports = router

