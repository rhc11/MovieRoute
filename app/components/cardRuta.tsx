import { Button, Icon, View } from "@ant-design/react-native"
import { Ruta } from "../models/Ruta"
import { tw } from "../lib/tailwind"
import { Text, Image } from "react-native"
import { CarouselMovies } from "./carouselMovies"
import { AccessTokenKey, Session } from "../lib/jwtDecode"
import { useState } from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

type Props = {
  ruta: Ruta
  session: Session | null
}

export const CardRuta: React.FC<Props> = ({ ruta, session }) => {
  const [fav, setFav] = useState<string | undefined>(
    ruta.favoritos[0] ? ruta.favoritos[0].id : undefined
  )

  const updateFav = async () => {
    const token = await AsyncStorage.getItem(AccessTokenKey)
    try {
      const response = await axios.post(
        `http://192.168.1.57:8080/usuarioFavorito`,
        { usuarioEmail: session ? session.email : "", rutaId: ruta.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.id) {
        setFav(response.data.id)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const deleteFav = async () => {
    const token = await AsyncStorage.getItem(AccessTokenKey)
    try {
      if (!session) {
        return
      }

      const response = await axios.delete(
        `http://192.168.1.57:8080/usuarioFavorito/${fav}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data) {
        setFav(undefined)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const onFav = async () => {
    fav ? await deleteFav() : await updateFav()
  }

  return (
    <View style={tw`rounded-lg border-2 border-black m-2 w-full`}>
      <View style={tw`relative`}>
        <Image
          source={{ uri: ruta.paradas[0].parada.imagenes[1] }}
          alt="MovieRoute"
          style={tw`w-full rounded-t-lg h-36`}
          resizeMode="cover"
        />
        <Button
          style={tw`absolute -bottom-5 left-1/3 bg-primary text-black w-1/3 border-primary rounded-full`}
          activeStyle={[tw`bg-gray-700 border-gray-700`]}
        >
          Ver más
        </Button>
      </View>

      <View style={tw`mt-6 mx-4 mb-2`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text
            style={tw`w-13/16 text-xl mr-4`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ruta.titulo}
          </Text>

          {fav ? (
            <Button style={tw`border-white rounded-full bg-primary h-15 w-15 p-0`} onPress={onFav} activeStyle={[tw`bg-gray-700`]}>
              <Icon name="star" color='black' size={30}/>
            </Button>
            
          ) : (
            <Button style={tw`border-white rounded-full bg-white h-15 w-15 p-0`} onPress={onFav} activeStyle={[tw`bg-gray-700`]}>
              <Icon name="star" color="black" size={30}/>
            </Button>
          )}
        </View>
        <View style={tw`flex-row items-center mt-1`}>
          <Icon name="environment" color="black" />
          <Text
            style={tw`text-base ml-2`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {ruta.localizacion}
          </Text>
        </View>
      </View>
      <View style={tw`w-full mt-4 mb-3`}>
        <CarouselMovies paradas={ruta.paradas} />
      </View>
    </View>
  )
}
