import { PrismaClient } from "@prisma/client"
import { LoginInput } from "../models/usuarios"
import { bcrypt } from "bcrypt"
import { jwt } from "jsonwebtoken"

const prisma = new PrismaClient()

export const login = async (loginInput: LoginInput) => {
  try {
    // Find a user with the specified email
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: loginInput.email,
      },
    })

    if (!usuario) return null

    // Check if the password provided by the user matches the hashed password in the database
    const validPassword = await bcrypt.compare(
      loginInput.password,
      usuario.password
    )

    if (!validPassword) return null

    // If the password is valid, generate a JWT token
    const token = jwt.sign(
      {
        email: usuario.email,
        rol: usuario.rol,
        nombre: usuario.nombre,
      },
      process.env.TOKEN_SECRET, {
        expiresIn: '1y'
      }
    )

    return token
  } catch (error) {
    throw error
  }
}
