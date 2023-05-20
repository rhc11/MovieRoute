import { ScrollView } from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { SearchBar, View } from "@ant-design/react-native"
import { useEffect, useState } from "react"
import { Ruta } from "../models/Ruta"
import { Session, jwtDecoded } from "../lib/jwtDecode"
import axios from "axios"
import { CardRuta } from "../components/cardRuta"

export const Home = () => {
  const [data, setData] = useState<Array<Ruta>>([])
  const [session, setSession] = useState<Session | null>(null)

  const fetchData = async (skip: number) => {
    try {
      const response = await axios.get(`http://192.168.1.57:8080/ruta`, {
        params: { skip, search: undefined, userEmail: session ? session.email : "" },
      })

      const rutasArray: Array<Ruta> = response.data

      setData((prevData) => [...prevData, ...rutasArray])
    } catch (error) {
      console.error("Error al obtener las rutas:", error)
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }
    checkSession()
    fetchData(0)
  }, [])

  if(data.length === 0) return <></>
  
  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <SearchBar placeholder="Buscar ruta" style={tw`inset-x-0 top-0`} />

      <ScrollView style={tw`flex-1 z-0`}>
        <View style={tw`flex-1 items-center justify-center p-5 pb-20`}>
          {data.map((ruta, index) => (
            <CardRuta key={index} ruta={ruta} />
          ))}
        </View>
      </ScrollView>

      <Menu />
    </View>
  )
}
