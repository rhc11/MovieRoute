import {
  ScrollView,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
} from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { SearchBar, View, ActivityIndicator } from "@ant-design/react-native"
import { useEffect, useState } from "react"
import { Ruta } from "../models/Ruta"
import { Session, jwtDecoded } from "../lib/jwtDecode"
import axios from "axios"
import { ProgressRuta } from "../components/progressRuta"

export const MisRutas = () => {
  const [data, setData] = useState<Array<Ruta>>([])
  const [session, setSession] = useState<Session | null>(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [noSkip, setNoSkip] = useState(-1)
  const [searchKey, setSearchKey] = useState(0)

  const fetchData = async (skip: number) => {
    if (skip === noSkip) return
    setLoading(true)
    try {
      setNoSkip(data.length)
      console.log(session)
      const response = await axios.get(`http://192.168.1.57:8080/ruta`, {
        params: {
          skip,
          search,
          userEmail: session ? session.email : "",
          onlyUser: true,
        },
      })

      const rutasArray: Array<Ruta> = response.data

      setData((prevData) => [...prevData, ...rutasArray])
    } catch (error) {
      console.error("Error al obtener las rutas:", error)
    }
    setLoading(false)
  }

  const cancelSearch = () => {
    Keyboard.dismiss()
    setSearchKey((prevKey) => prevKey + 1)
    handleSearch("")
  }

  const handleSearch = (value: string) => {
    setData([])
    setNoSkip(-1)
    setSearch(value)
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let paddingToBottom = 10
    paddingToBottom += event.nativeEvent.layoutMeasurement.height

    if (
      event.nativeEvent.contentOffset.y >=
      event.nativeEvent.contentSize.height - paddingToBottom
    ) {
      fetchData(data.length)
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }

    checkSession()
  }, [])

  useEffect(() => {
    if (session) {
      fetchData(0)
    }
  }, [search, session])

  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <SearchBar
        key={searchKey}
        placeholder="Buscar ruta"
        style={tw`inset-x-0 top-0 border-black rounded-full`}
        onSubmit={handleSearch}
        onCancel={() => cancelSearch()}
      />

      <ScrollView
        style={tw`flex-1 z-0`}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-1 items-center justify-center p-3 pb-20`}>
          {data.length === 0 ? (
            <></>
          ) : (
            data.map((ruta, index) => <ProgressRuta key={index} ruta={ruta} />)
          )}
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          data.length === 0 && (
            <Text style={tw`w-full text-center`}>
              No se han encontrado resultados
            </Text>
          )
        )}
      </ScrollView>

      <Menu />
    </View>
  )
}
