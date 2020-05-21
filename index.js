require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/auth-router')
const usersRouter = require('./routers/users-router')
const server = express()
const port = 6000

server.use(express.json())
server.use(cookieParser())
server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'somthing went wrong'
    })
})

server.listen(port, () => {
    console.log(`server running on port: ${port}`)
})