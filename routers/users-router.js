const express = require('express')
const router = express.Router()
const usersModel = require('../models/users-model')

router.get('/', async (req, res, next) => {
    try {
        const users = await usersModel.find()
        res.json(users)

    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await usersModel.findById(req.params.id)
        res.json(user)
    } catch(err) {
        next(err)
    }
})


router.put('/:id', async (req, res, next) => {
    try {
        const updatedUser = await usersModel.update(req.params.id, req.body)
        res.json(updatedUser)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await usersModel.findById(req.params.id)
        if(!user) {
            return res.status(400).json({
                message: 'user not found'
            })
        }
        await usersModel.remove(req.params.id)
        res.status(204).end()

    } catch(err) {
        next(err)
    }
})

router.get('/:id/entries', async (req, res, next) => {
    try {


    } catch(err) {
        next(err)
    }
})

router.post('/:id/entries', async (req, res, next) => {
    try {


    } catch(err) {
        next(err)
    }
})

router.put('/:id/entries/:id', async (req, res, next) => {
    try {


    } catch(err) {
        next(err)
    }
})

router.delete('/:id/entries/:id', async (req, res, next) => {
    try {


    } catch(err) {
        next(err)
    }
})

module.exports = router