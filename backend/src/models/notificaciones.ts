import * as z from "zod"

export const ParadaModel = z.object({
  id: z.string(),
  texto: z.string(),
  usuarioEmail: z.string()
})

export type ParadaModel = z.infer<typeof ParadaModel>

export const ParadaModelInput = ParadaModel.omit({ id: true })

export type ParadaModelInput = z.infer<typeof ParadaModelInput>
