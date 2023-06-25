import AsyncStorage from "@react-native-async-storage/async-storage"
import jwt_decode from "jwt-decode"
import { ACCESS_TOKEN } from '@env'

export const AccessTokenKey = ACCESS_TOKEN

export type Session = {
  email: string
  rol: string
  nombre: string
  iat: number
  exp: number
}

export const jwtDecoded = async (): Promise<Session | null> => {
  const token = await AsyncStorage.getItem(AccessTokenKey)

  if (!token) {
    return null
  }

  return jwt_decode(token)
}
