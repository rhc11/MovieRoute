import { PrismaClient } from "@prisma/client"
import { UsuarioModelInput, UsuarioPassword } from "../models/usuarios"
import * as bcrypt from "bcrypt"
import { createToken } from "../helpers/createToken"

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

    const token = await createToken(usuario)

    return { ...usuario, token}
  } catch (error) {
    throw error
  }
}

export const updateUsuario = async (usuario: UsuarioPassword) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const newPassword: string = await bcrypt.hash(usuario.password, salt)

    const usuarioUpdated = await prisma.usuario.update({
      where: {
        email: usuario.email
      },
      data: {
        password: newPassword
      }
    })

    const token = await createToken(usuarioUpdated)

    return { ...usuarioUpdated, token}
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