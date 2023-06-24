import MapView, { Marker } from "react-native-maps"
import { Parada } from "../models/Parada"
import React, { useEffect, useState } from "react"
import { tw } from "../lib/tailwind"
import * as Location from "expo-location"
import { ActivityIndicator } from "react-native"
import { Icon } from "@ant-design/react-native"

// Type definition for the component's props
type Props = {
  paradas: { parada: Parada }[]
  paradaActual?: Parada
}

// Type definition for the location object
type Location = {
  latitude: number
  longitude: number
}

// Function component definition
export const Mapas: React.FC<Props> = ({ paradas, paradaActual }) => {
  const todasLasParadas = paradas.map((item) => item.parada).flat()

  // State declaration for the current location
  const [current, setCurrent] = useState<Location | undefined>(undefined)

  // Effect hook to check and set the current location periodically
  useEffect(() => {
    const checkLocation = async () => {
      // Request permission to access the location
      const { status } = await Location.requestForegroundPermissionsAsync()

      // Return if permission is not granted
      if (status !== "granted") {
        return
      }

      // Get the current location with high accuracy
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      const { latitude, longitude } = location.coords

      // Set the current location
      setCurrent({ latitude, longitude })
    }
    checkLocation()

    // Call the checkLocation function every 20 seconds
    const interval = setInterval(checkLocation, 20 * 1000)

    // Clear the interval on component unmount
    return () => clearInterval(interval)
  }, [])

  // Return an activity indicator while loading
  if (todasLasParadas.length === 0 || current === undefined)
    return <ActivityIndicator size="large" />

  // Render the map
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
