import { Icon, TabBar } from "@ant-design/react-native"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-native"
import { tw } from "../lib/tailwind"
import { View } from "react-native"

export const Menu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onChangeTab = (tab: string) => {
    navigate(tab)
  }

  return (
    <View style={tw`absolute inset-x-0 bottom-0`}>
      <TabBar unselectedTintColor="#949494" tintColor="#ffcd6b">
        <TabBar.Item
          title="Home"
          icon={<Icon name="home" />}
          selected={location.pathname === "/home"}
          onPress={() => onChangeTab("/home")}
        />
        <TabBar.Item
          title="Mis rutas"
          icon={<Icon name="video-camera" />}
          selected={location.pathname === "/misRutas"}
          onPress={() => onChangeTab("/misRutas")}
        />
        <TabBar.Item
          title="Favoritos"
          icon={<Icon name="star" />}
          selected={location.pathname === "/favorites"}
          onPress={() => onChangeTab("/favorites")}
        />
        <TabBar.Item
          title="Perfil"
          icon={<Icon name="user" />}
          selected={location.pathname === "/user"}
          onPress={() => onChangeTab("/user")}
        />
      </TabBar>
    </View>
  )
}
