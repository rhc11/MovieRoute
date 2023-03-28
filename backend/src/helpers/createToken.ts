import { Usuario } from "@prisma/client"
import * as jwt from "jsonwebtoken"

export const createToken = async (usuario: Usuario) => {
  try {
    const token = jwt.sign(
      {
        email: usuario.email,
        rol: usuario.rol,
        nombre: usuario.nombre,
      },
      process.env.TOKEN_SECRET || "",
      {
        expiresIn: "1y",
      }
    )

    return token
  } catch (error) {
    throw error
  }
}
