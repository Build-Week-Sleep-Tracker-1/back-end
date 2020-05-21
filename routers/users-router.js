const express = require('express')
const router = express.Router()
const usersModel = require('../models/users-model')
const entriesModel = require('../models/entries-model')
const authenticate = require('../middleware/authenticate-moddleware')

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
        if(!user) {
            return res.status(400).json({
                message: 'user not found'
            })
        }
        res.json(user)
    } catch(err) {
        next(err)
    }
})


router.put('/:id', authenticate(), async (req, res, next) => {
    try {
        const updatedUser = await usersModel.update(req.params.id, req.body)
        res.json(updatedUser)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', authenticate(), async (req, res, next) => {
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

router.get('/:id/entries', authenticate(), async (req, res, next) => {
    try {
        const entries = await entriesModel.findByUserId(req.params.id)
        res.json(entries)

    } catch(err) {
        next(err)
    }
})

router.post('/:id/entries', authenticate(), async (req, res, next) => {
    try {
        const entryToAdd = {
            date: req.body.date,
            sleep_start: req.body.sleep_start,
            sleep_end: req.body.sleep_end,
            total_time: req.body.total_time,
            mood_score: req.body.mood_score,
            user_id: req.params.id
        }

        const addedEntry = await entriesModel.add(entryToAdd)
        res.json(addedEntry)


    } catch(err) {
        next(err)
    }
})

router.put('/:id/entries/:entryid', authenticate(), async (req, res, next) => {
    try {
        const entryToAdd = {
            date: req.body.date,
            sleep_start: req.body.sleep_start,
            sleep_end: req.body.sleep_end,
            total_time: req.body.total_time,
            mood_score: req.body.mood_score,
            user_id: req.params.id
        }

        const updatedEntry = await entriesModel.update(req.params.entryid, entryToAdd)
        res.json(updatedEntry)

    } catch(err) {
        next(err)
    }
})

router.delete('/:id/entries/:entryid', authenticate(), async (req, res, next) => {
    try {
        const entry = await entriesModel.findById(req.params.entryid)
        if(!entry) {
            return res.status(400).json({
                message: 'entry not found'
            })
        }
        await entriesModel.remove(req.params.entryid)
        res.status(204).end()

    } catch(err) {
        next(err)
    }
})

module.exports = router