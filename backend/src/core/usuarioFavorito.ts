import { PrismaClient } from "@prisma/client"
import { UsuarioFavoritoModelInput } from "../models/usuarioFavorito"

const prisma = new PrismaClient()

export const getUsuarioFavorito = async (
  usuarioFavoritoInput: UsuarioFavoritoModelInput
) => {
  try {
    const usuarioFavorito = await prisma.usuarioFavorito.findUnique({
      where: {
        usuarioEmail_rutaId: {
          usuarioEmail: usuarioFavoritoInput.usuarioEmail,
          rutaId: usuarioFavoritoInput.rutaId,
        },
      },
    })

    return usuarioFavorito
  } catch (error) {
    throw error
  }
}

export const createUsuarioFavorito = async (
  usuarioFavoritoInput: UsuarioFavoritoModelInput
) => {
  try {
    const usuarioFavorito = await prisma.usuarioFavorito.create({
      data: usuarioFavoritoInput,
    })

    return usuarioFavorito
  } catch (error) {
    throw error
  }
}

export const updateUsuarioFavorito = async (
  usuarioFavorito: UsuarioFavoritoModelInput,
  id: string
) => {
  try {
    const usuarioFavoritoUpdated = await prisma.usuarioFavorito.update({
      where: {
        id,
      },
      data: usuarioFavorito,
    })

    return usuarioFavoritoUpdated
  } catch (error) {
    throw error
  }
}

export const deleteUsuarioFavorito = async (id: string) => {
  try {
    const usuarioFavorito = await prisma.usuarioFavorito.delete({
      where: {
        id,
      },
    })

    return usuarioFavorito
  } catch (error) {
    throw error
  }
}
