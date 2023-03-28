import { Handler } from "express"
import { login } from "../core/login"

import { LoginInput } from "../models/usuarios"

export const loginController: Handler = async (req, res) => {
  const validatedBody = LoginInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const token = await login(validatedBody.data)

  if (!token) {
    return res.status(404).send()
  }

  return res.status(200).header("auth-token", token).json({
    data: { token },
    message: "Bienvenido",
  })
}
