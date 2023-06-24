import { Provider } from "@ant-design/react-native"
import { Router } from "./Router"
import esES from "@ant-design/react-native/lib/locale-provider/es_ES"
import * as Font from "expo-font"
import { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

// Defining theme for ant-design
const theme = {
  brand_primary: "#FFCD6B",
  color_link: "#FFCD6B"
}

// Defining App component
export default function App() {
  // State to check if the app is ready
  const [isReady, setIsReady] = useState(false)

  // useEffect hook to load necessary fonts asynchronously when the component is mounted
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        // Loading fonts for ant-design icons
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
        antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
      })

      // Updating state to denote that the app is ready
      setIsReady(true)
    }

    // Calling the function to load fonts
    loadFonts()
  }, [])

  // If the app is not ready, render a loading spinner
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }

  // If the app is ready, render the application wrapped in a Provider component for theming and localization idiom
  return (
    <Provider locale={esES} theme={theme}>
      <Router />
    </Provider>
  )
}