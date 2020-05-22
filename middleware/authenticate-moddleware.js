const jwt = require('jsonwebtoken')

function authenticate() {
    return async (req, res, next) => {
        const authErr = {
            message: 'you are not authorized'
        }

        try {
            const { authorization } = req.headers
            if(!authorization) {
                return res.status(401).json(authErr)
            }

            jwt.verify(authorization, process.env.JWT_SECRET, (err, decodedPayload) => {
                if(err) {
                    return res.status(401).json(authErr)
                }

                req.token = decodedPayload
                next()
            })

        } catch(err) {
            next(err)
        }
    }
}

module.exports = authenticate