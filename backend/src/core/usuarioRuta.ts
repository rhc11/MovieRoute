import { PrismaClient } from "@prisma/client"
import { UsuarioRutaModelInput } from "../models/usuarioRuta"

const prisma = new PrismaClient()

export const getUsuarioRutas = async () => {
  try {
    const usuarioRutas = await prisma.usuarioRuta.findMany()

    return usuarioRutas
  } catch (error) {
    throw error
  }
}

export const getUsuarioRuta = async (id: string) => {
  try {
    const usuarioRuta = await prisma.usuarioRuta.findUnique({
      where: {
        id,
      },
    })

    return usuarioRuta
  } catch (error) {
    throw error
  }
}

export const createUsuarioRuta = async (usuarioRutaInput: UsuarioRutaModelInput) => {
  try {
    const usuarioRuta = await prisma.usuarioRuta.create({
      data: usuarioRutaInput
    })

    return usuarioRuta
  } catch (error) {
    throw error
  }
}

export const updateUsuarioRuta = async (usuarioRuta: UsuarioRutaModelInput, id: string) => {
  try {
    const usuarioRutaUpdated = await prisma.usuarioRuta.update({
      where: {
        id
      },
      data: usuarioRuta
    })

    return usuarioRutaUpdated
  } catch (error) {
    throw error
  }
}

export const deleteUsuarioRuta = async (id: string) => {
  try {
    const usuarioRuta = await prisma.usuarioRuta.delete({
      where: {
        id,
      },
    })

    return usuarioRuta
  } catch (error) {
    throw error
  }
}