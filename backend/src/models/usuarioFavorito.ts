import * as z from "zod"

export const UsuarioFavoritoModel = z.object({
  id: z.string(),
  usuarioEmail: z.string(),
  rutaId: z.string()
})

export type UsuarioFavoritoModel = z.infer<typeof UsuarioFavoritoModel>

export const UsuarioFavoritoModelInput = UsuarioFavoritoModel.omit({ id: true })

export type UsuarioFavoritoModelInput = z.infer<typeof UsuarioFavoritoModelInput>
