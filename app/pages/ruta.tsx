import { ScrollView, View, Image, Text, ActivityIndicator } from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { useNavigate, useParams } from "react-router-native"
import { Ruta } from "../models/Ruta"
import { useEffect, useState } from "react"
import axios from "axios"
import { AccessTokenKey, Session, jwtDecoded } from "../lib/jwtDecode"
import { Button, Carousel, Icon, Steps } from "@ant-design/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CarouselMovies } from "../components/carouselMovies"
import { Mapas } from "../components/mapa"

const Step = Steps.Step

export const RutaPreview = () => {
  const { rutaId } = useParams<{ rutaId: string }>()
  const [ruta, setRuta] = useState<Ruta | undefined>(undefined)
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)
  const [imagenes, setImagenes] = useState<Array<JSX.Element>>([])
  const [fav, setFav] = useState<string | undefined>(undefined)
  const [nextParada, setNextParada] = useState<string | undefined>(undefined)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.57:8080/ruta/${rutaId}`,
        {
          params: {
            userEmail: session ? session.email : "",
          },
        }
      )

      const rutaData: Ruta = response.data

      setRuta(rutaData)
    } catch (error) {
      navigate(-1)
      console.error("Error al obtener las rutas:", error)
    }
  }

  const onPress = async () => {
    try {
      const token = await AsyncStorage.getItem(AccessTokenKey)
      await axios.patch(
        `http://192.168.1.57:8080/usuarioRuta/`,
        {
          usuarioEmail: session ? session.email : "",
          rutaId: ruta ? ruta.id : "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    } catch (error) {
      navigate(-1)
      console.error(error)
    }

    nextParada
      ? navigate(`/home/${rutaId}/parada/${nextParada}`)
      : navigate(`/home/${rutaId}`)
  }

  useEffect(() => {
    if (ruta) {
      const paradasDiferentes = ruta.paradas
        .filter((p) => {
          return !ruta.paradasCompletadas?.find(
            (pc) => pc.paradaId === p.parada.id
          )
        })
        .map((p) => p.parada)

      paradasDiferentes.length !== 0
        ? setNextParada(paradasDiferentes[0].id)
        : navigate(`/acabada/${rutaId}`, { state: { forceRefresh: true } })

      setFav(ruta.favoritos[0] ? ruta.favoritos[0].id : undefined)

      const todasLasImagenes = ruta.paradas
        .map((item) => item.parada.imagenes)
        .flat()

      const itemImagenes = todasLasImagenes.map((imagen, index) => (
        <Image
          source={{ uri: imagen }}
          alt={index.toString()}
          style={tw`w-full h-full`}
          resizeMode="cover"
          key={index}
        />
      ))

      setImagenes(itemImagenes)
    }
  }, [ruta])

  const updateFav = async () => {
    const token = await AsyncStorage.getItem(AccessTokenKey)
    try {
      const response = await axios.post(
        `http://192.168.1.57:8080/usuarioFavorito`,
        {
          usuarioEmail: session ? session.email : "",
          rutaId: ruta ? ruta.id : undefined,
        },
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

  useEffect(() => {
    const checkSession = async () => {
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <Button
        style={[
          tw`border-black rounded-full h-10 w-10 z-1 p-0`,
          { position: "absolute", top: 10, left: 10 },
        ]}
        activeStyle={[tw`bg-gray-700`]}
        onPress={() => navigate(-1)}
      >
        <Icon name="left" color="black" />
      </Button>
      <ScrollView style={tw`flex-1 z-0`} showsVerticalScrollIndicator={false}>
        {ruta ? (
          <>
            <Button
              style={[
                tw`border-black rounded-full h-10 w-10 z-1 p-0`,
                { position: "absolute", top: 140, right: 10 },
              ]}
              activeStyle={[tw`bg-gray-700`]}
            >
              <Icon name="share-alt" color="black" />
            </Button>
            {fav ? (
              <Button
                style={[
                  tw`border-black rounded-full bg-primary h-10 w-10 z-1 p-0`,
                  { position: "absolute", top: 140, left: 10 },
                ]}
                activeStyle={[tw`bg-gray-700`]}
                onPress={onFav}
              >
                <Icon name="star" color="black" />
              </Button>
            ) : (
              <Button
                style={[
                  tw`border-black rounded-full h-10 w-10 z-1 p-0`,
                  { position: "absolute", top: 140, left: 10 },
                ]}
                activeStyle={[tw`bg-gray-700`]}
                onPress={onFav}
              >
                <Icon name="star" color="black" />
              </Button>
            )}

            <Carousel infinite style={tw`h-48`}>
              {imagenes}
            </Carousel>
            <Text style={tw`mx-6 my-4 text-xl font-semibold`}>{ruta.titulo}</Text>

            <View style={tw`flex-row items-center mx-6 mb-4`}>
              <Icon name="environment" color="black" />
              <Text style={tw`text-base ml-2`}>{ruta.localizacion}</Text>
            </View>

            <Button
              style={tw`bg-primary text-black border-0 w-full rounded-none`}
              onPress={onPress}
            >
              Comenzar ruta
            </Button>

            <View style={tw`m-4 mb-6 bg-black rounded-lg`}>
              <Text style={tw`text-base text-primary p-4 text-center`}>
                Toma una foto en cada parada y podrás ganar increibles... {"\n"}
                ¡Premios y descuentos!
              </Text>
            </View>

            <Text style={tw`mx-6 text-lg`}>Información</Text>
            <Text style={tw`mx-6 mt-2 mb-6 text-base`}>
              {ruta.descripcion}
            </Text>

            <View style={tw`w-full`}>
              <CarouselMovies paradas={ruta.paradas} />
            </View>

            <Text style={tw`m-6 text-lg`}>Paradas</Text>
            <Mapas paradas={ruta.paradas}/>
            <View style={tw`w-full mx-6 mb-12`}>
              <Steps direction="vertical">
                {ruta.paradas.map((parada) => (
                  <Step
                    key={parada.parada.id}
                    title={parada.parada.titulo}
                    status="wait"
                    description={parada.parada.direccion}
                  />
                ))}
              </Steps>
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
      <Menu />
    </View>
  )
}
