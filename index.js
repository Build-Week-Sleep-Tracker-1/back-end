require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/auth-router')
const usersRouter = require('./routers/users-router')
const server = express()
const port = process.env.PORT || 6000

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(cookieParser())
server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'somthing went wrong'
    })
})

if(!module.parent) {
    server.listen(port, () => {
        console.log(`server running on port: ${port}`)
    })
}

module.exports = server