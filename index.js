const express = require('express')
const server = express()
const port = 6000

server.use(express.json())

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'somthing went wrong'
    })
})

server.listen(port, () => {
    console.log(`server running on port: ${port}`)
})