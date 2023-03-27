import { PrismaClient } from "@prisma/client"
import { LoginInput } from "../models/usuarios"
import { bcrypt } from "bcrypt"
import { jwt } from "jsonwebtoken"

const prisma = new PrismaClient()

export const login = async (loginInput: LoginInput) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: loginInput.email,
      },
    })

    if (!usuario) return null

    const validPassword = await bcrypt.compare(
      loginInput.password,
      usuario.password
    )

    if (!validPassword) return null

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
