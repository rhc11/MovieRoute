import jwt_decode from "jwt-decode"

export const AccessTokenKey = "accessToken"

export type Session = {
  email: string
  rol: string
  nombre: string
  iat: number
  exp: number
}

export const jwtDecoded = (): Session | null => {
  const token = localStorage.getItem(AccessTokenKey)

  if (!token) {
    return null
  }

  return jwt_decode(token)
}
