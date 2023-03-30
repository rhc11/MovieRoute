import { Handler } from "express"
import * as jwt from "jsonwebtoken"

export const verifyToken: Handler = (req, res, next) => {
  try {
    // Get the authorization header from the request
    const authHeader = req.header('Authorization')

    // Check if authorization header exists
    if (!authHeader) {
      throw new Error('Acceso denegado')
    }

    // Split the authorization header to get the token
    const token = authHeader.split(' ')[1]

    // Verify token using the provided secret key
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || '')

    if (!verified) {
      throw new Error('Acceso denegado')
    }

    // Move to the next middleware
    next()
  } catch (error) {
    // Handle errors related to token verification
    res.status(400).json(error)
  }
}
