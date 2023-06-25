// Importing required components and libraries
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
import { API_URL } from '@env'

// Define the component
export const MisRutas = () => {
  // Initialize states
  const [data, setData] = useState<Array<Ruta>>([])  // Store routes
  const [session, setSession] = useState<Session | null>(null)  // Store user session info
  const [search, setSearch] = useState("")  // Store search term
  const [loading, setLoading] = useState(true)  // Toggle loading state
  const [noSkip, setNoSkip] = useState(-1)  // For pagination
  const [searchKey, setSearchKey] = useState(0)  // Key to control search bar render

  // Define a function to fetch routes data
  const fetchData = async (skip: number) => {
    if (skip === noSkip) return  // Avoids unnecessary calls when no new data
    setLoading(true)  // Set loading before API call
    try {
      setNoSkip(data.length)  // Set the skip to current data length
      // Make API call
      const response = await axios.get(`${API_URL}/ruta`, {
        params: {
          skip,
          search,
          userEmail: session ? session.email : "",
          onlyUser: true,
        },
      })

      const rutasArray: Array<Ruta> = response.data

      setData((prevData) => [...prevData, ...rutasArray])  // Merge old and new data
    } catch (error) {
      console.error("Error al obtener las rutas:", error)  // Log any error
    }
    setLoading(false)  // Stop loading after API call
  }

  // Function to cancel the search
  const cancelSearch = () => {
    Keyboard.dismiss()  // Dismiss the keyboard
    setSearchKey((prevKey) => prevKey + 1)  // Change the search bar key
    handleSearch("")  // Reset the search
  }

  // Function to handle search operation
  const handleSearch = (value: string) => {
    setData([])  // Reset the data
    setNoSkip(-1)  // Reset the skip
    setSearch(value)  // Set the search term
  }

  // Function to handle scroll event
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let paddingToBottom = 10
    paddingToBottom += event.nativeEvent.layoutMeasurement.height

    // Load more data when scrolled to the bottom
    if (
      event.nativeEvent.contentOffset.y >=
      event.nativeEvent.contentSize.height - paddingToBottom
    ) {
      fetchData(data.length)
    }
  }

  // On component mount, check and set the session
  useEffect(() => {
    const checkSession = async () => {
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }

    checkSession()
  }, [])

  // On search or session change, fetch the data
  useEffect(() => {
    if (session) {
      fetchData(0)
    }
  }, [search, session])

  // Component layout
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
