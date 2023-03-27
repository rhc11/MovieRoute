import * as z from "zod"

export const UsuarioRutaModel = z.object({
  id: z.string(),
  usuarioEmail: z.string(),
  rutaId: z.string()
})

export type UsuarioRutaModel = z.infer<typeof UsuarioRutaModel>

export const UsuarioRutaModelInput = UsuarioRutaModel.omit({ id: true })

export type UsuarioRutaModelInput = z.infer<typeof UsuarioRutaModelInput>
