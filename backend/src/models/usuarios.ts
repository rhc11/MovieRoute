import * as z from "zod"

export const UsuarioModel = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  rol: z.string(),
  nombre: z.string(),
  not_modo: z.boolean()
})

export type UsuarioModel = z.infer<typeof UsuarioModel>

export const UsuarioModelInput = UsuarioModel.omit({ id: true, rol: true, not_modo: true })

export type UsuarioModelInput = z.infer<typeof UsuarioModelInput>

export const LoginInput = UsuarioModel.omit({ id: true, rol: true, nombre: true, not_modo: true })

export type LoginInput = z.infer<typeof LoginInput>

export const UsuarioPassword = UsuarioModel.omit({ id: true, rol: true, nombre: true, not_modo: true })

export type UsuarioPassword = z.infer<typeof UsuarioPassword>
