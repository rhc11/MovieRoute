import * as z from "zod"

export const CompletadoModel = z.object({
  id: z.string(),
  foto: z.string(),
  usuarioEmail: z.string(),
  paradaId: z.string(),
})

export const CreateCompletadoModel = z.object({
  foto: z.string(),
  usuarioEmail: z.string(),
  paradaId: z.string(),
  coords: z.object({
    latitude: z.number(),
    longitude: z.number()
  })
})

export type CompletadoModel = z.infer<typeof CompletadoModel>

export type CreateCompletadoModel = z.infer<typeof CreateCompletadoModel>

export const CompletadoModelInput = CompletadoModel.omit({ id: true })

export type CompletadoModelInput = z.infer<typeof CompletadoModelInput>
