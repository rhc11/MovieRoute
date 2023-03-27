import * as z from "zod"

export const CompletadoModel = z.object({
  id: z.string(),
  foto: z.string(),
  usuarioEmail: z.string(),
  paradaId: z.string(),
})

export type CompletadoModel = z.infer<typeof CompletadoModel>

export const CompletadoModelInput = CompletadoModel.omit({ id: true })

export type CompletadoModelInput = z.infer<typeof CompletadoModelInput>
