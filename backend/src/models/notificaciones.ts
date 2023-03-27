import * as z from "zod"

export const NotificacionModel = z.object({
  id: z.string(),
  texto: z.string(),
  usuarioEmail: z.string()
})

export type NotificacionModel = z.infer<typeof NotificacionModel>

export const NotificacionModelInput = NotificacionModel.omit({ id: true })

export type NotificacionModelInput = z.infer<typeof NotificacionModelInput>
