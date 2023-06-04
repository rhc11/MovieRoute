import MapView, { Marker } from "react-native-maps"
import { Parada } from "../models/Parada"
import React, { useEffect, useState } from "react"
import { tw } from "../lib/tailwind"
import * as Location from "expo-location"
import { ActivityIndicator } from "react-native"
import { Icon } from "@ant-design/react-native"

type Props = {
  paradas: { parada: Parada }[]
  paradaActual?: Parada
}

type Location = {
  latitude: number
  longitude: number
}

export const Mapas: React.FC<Props> = ({ paradas, paradaActual }) => {
  const todasLasParadas = paradas.map((item) => item.parada).flat()

  const [current, setCurrent] = useState<Location | undefined>(undefined)

  useEffect(() => {
    const checkLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== "granted") {
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      const { latitude, longitude } = location.coords

      setCurrent({ latitude, longitude })
    }
    checkLocation()

    const interval = setInterval(checkLocation, 20 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (todasLasParadas.length === 0 || current === undefined)
    return <ActivityIndicator size="large" />

  return (
    <MapView
      style={tw`w-full h-96 mb-6`}
      initialRegion={{
        latitude: paradaActual
          ? Number(paradaActual.coordenadas.latitud)
          : current.latitude,
        longitude: paradaActual
          ? Number(paradaActual.coordenadas.altitud)
          : current.longitude,
        latitudeDelta: paradaActual ? 0.09 : 1,
        longitudeDelta: paradaActual ? 0.09 : 1,
      }}
    >
      <Marker coordinate={current} title="Ubicación Actual">
        <Icon name="aim" color="#FFCD6B" size="lg" />
      </Marker>
      {todasLasParadas.map((parada, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(parada.coordenadas.latitud),
              longitude: Number(parada.coordenadas.altitud),
            }}
            title={parada.titulo}
            pinColor={
              paradaActual && parada.id === paradaActual.id ? "#FFCD6B" : ""
            }
          />
        )
      })}
    </MapView>
  )
}
