import { Provider } from "@ant-design/react-native"
import { Router } from "./Router"
import esES from "@ant-design/react-native/lib/locale-provider/es_ES"
import * as Font from "expo-font"
import { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
        antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
      })

      setIsReady(true)
    }

    loadFonts()
  }, [])

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }

  return (
    <Provider locale={esES}>
      <Router />
    </Provider>
  )
}
