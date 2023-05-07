import { ScrollView, Text } from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { SearchBar, View } from "@ant-design/react-native"

export const Home = () => {
  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <SearchBar
        placeholder="Buscar ruta"
        style={tw`inset-x-0 top-0`}
      />

<ScrollView style={tw`flex-1 z-0`}>
        <View style={tw`flex-1 items-center justify-center p-5 pb-20`}>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        <Text>Contenido del ScrollView</Text>
        

        
      </View>
    </ScrollView>

      <Menu />
    </View>
  )
}
