import { PrismaClient } from "@prisma/client"
import { UsuarioModelInput } from "../models/usuarios"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const getUsuarios = async () => {
  try {
    const usuarios = await prisma.usuario.findMany()

    return usuarios
  } catch (error) {
    throw error
  }
}

export const getUsuario = async (id: string) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id,
      },
    })

    return usuario
  } catch (error) {
    throw error
  }
}

export const createUsuario = async (usuarioInput: UsuarioModelInput) => {

  const salt = await bcrypt.genSalt(10)
  const password: string = await bcrypt.hash(usuarioInput.password, salt)

  const newUser = {
    ...usuarioInput,
    password,
    rol: 'USER',
    not_modo: true
  }

  try {
    const usuario = await prisma.usuario.create({
      data: newUser
    })

    return usuario
  } catch (error) {
    throw error
  }
}

export const updateUsuario = async (usuario: UsuarioModelInput, id: string) => {
  try {
    const usuarioUpdated = await prisma.usuario.update({
      where: {
        id
      },
      data: usuario
    })

    return usuarioUpdated
  } catch (error) {
    throw error
  }
}

export const deleteUsuario = async (id: string) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        id,
      },
    })

    return usuario
  } catch (error) {
    throw error
  }
}