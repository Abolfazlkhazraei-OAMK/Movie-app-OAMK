import jwt from 'jsonwebtoken'
const { verify } = jwt
const authorizationRequiered = 'Authorization requiered'
const invalidCredentials = 'Invalid credentials'

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.statusMessage = authorizationRequiered
        res.status(401).json({message: authorizationRequiered})
    } else {
        try {
            const token = req.headers.authorization
            jwt.verify(token,process.env.TMDB_ACCESS_TOKEN)
            next()
        } catch (err) {
            res.statusMessage = invalidCredentials
            res.status(403).json({message: invalidCredentials})
        }
    }
}

export { auth }