import { PrismaClient } from "@prisma/client"
import { LoginInput } from "../models/usuarios"
import * as bcrypt  from "bcrypt"
import * as jwt from "jsonwebtoken"
import { createToken } from "../helpers/createToken"

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

    return await createToken(usuario)
  } catch (error) {
    throw error
  }
}
