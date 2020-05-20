const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../data/config')
const router = express.Router()

router.post('/register', vaildBody(), async (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
})

function vaildBody() {
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

