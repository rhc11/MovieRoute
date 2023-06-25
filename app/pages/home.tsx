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
import { CardRuta } from "../components/cardRuta"
import { API_URL } from '@env'

// Define the component
export const Home = () => {
  // Initialize state variables
  const [data, setData] = useState<Array<Ruta>>([])
  const [session, setSession] = useState<Session | null>(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [noSkip, setNoSkip] = useState(-1)
  const [searchKey, setSearchKey] = useState(0)

  // Function to fetch data from the server
  const fetchData = async (skip: number) => {
    if (skip === noSkip) return
    setLoading(true)
    try {
      setNoSkip(data.length)
      const response = await axios.get(`${API_URL}/ruta`, {
        params: { skip, search, userEmail: session ? session.email : "" },
      })

      const rutasArray: Array<Ruta> = response.data

      setData((prevData) => [...prevData, ...rutasArray])
    } catch (error) {
      console.error("Error al obtener las rutas:", error)
    }
    setLoading(false)
  }

  // Function to cancel search and clear the search bar
  const cancelSearch = () => {
    Keyboard.dismiss()
    setSearchKey(prevKey => prevKey + 1)
    handleSearch('')
  }

  // Function to handle search input changes
  const handleSearch = (value: string) => {
    setData([])
    setNoSkip(-1)
    setSearch(value)
  }

  // Function to handle scroll events and fetch more data if needed
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
    fetchData(0)
  }, [search])

  useEffect(() => {
    const checkSession = async () => {
      // Check if a session exists
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }
    checkSession()
  }, [])

  // Component rendering
  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      {/* SearchBar component */}
      <SearchBar
        key={searchKey}
        placeholder="Buscar ruta"
        style={tw`inset-x-0 top-0 border-black rounded-full`}
        onSubmit={handleSearch}
        onCancel={() => cancelSearch()}
      />

      {/* ScrollView for displaying routes */}
      <ScrollView style={tw`flex-1 z-0`} onScroll={handleScroll} showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 items-center justify-center p-3 pb-20`}>
          {data.length === 0 ? (
            <></>
          ) : (
            data.map((ruta, index) => <CardRuta key={index} ruta={ruta} session={session} />)
          )}
        </View>
        {/* Loading indicator or "No results" message */}
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

      {/* Menu component */}
      <Menu />
    </View>
  )
}
