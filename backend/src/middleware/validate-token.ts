import { Handler } from "express"
import * as jwt from "jsonwebtoken"

export const verifyToken: Handler = (req, res, next) => {
  try {
    const token = req.header("token")

    // Check if token exists
    if (!token) {
      throw new Error("Acceso denegado")
    }

    // Verify token using the provided secret key
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || '')

    if (!verified) {
        throw new Error("Acceso denegado")
    }

    // Move to the next middleware
    next()
  } catch (error) {
    // Handle errors related to token verification
    res.status(400).json(error)
  }
}
