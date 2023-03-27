import { jwt } from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.header('token')

    // Check if token exists
    if(!token) return res.status(401).json({error: 'Acceso denegado'})

    try {
        // Verify token using the provided secret key
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)

         // Store user data in the request object
        req.user = verified

        // Move to the next middleware
        next()
    } catch (error){
        // Handle errors related to token verification
        res.status(400).json({error: 'Token no valido, acceso denegado'})
    }
}