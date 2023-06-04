import { View } from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { Accordion, Button, List } from "@ant-design/react-native"
import { useNavigate } from "react-router-native"
import { Text } from "react-native"
import { useState } from "react"

  
  export const User = () => {
    const navigate = useNavigate()
    const [activeSections, setActiveSections] = useState<Array<number> | undefined>(undefined)

    const onChange = (activeSection: Array<number>) => {
      setActiveSections(activeSection)
    }

    return (
      <>
      <View style={{ flex: 1, zIndex: 1 }}>
      <Text style={tw`m-6 text-2xl font-black`}>Cuenta</Text>
      <Accordion
          onChange={onChange}
          activeSections={activeSections}
          >
          <Accordion.Panel header="Perfíl">
            <List>
              <List.Item>Content 1</List.Item>
              <List.Item>Content 2</List.Item>
              <List.Item>Content 3</List.Item>
            </List>
          </Accordion.Panel>
          <Accordion.Panel header="Preferencias">
            this is panel content2 or other
          </Accordion.Panel>
          <Accordion.Panel header="Soporte">
            Text text text text text text text text text text text text text
            text text
          </Accordion.Panel>
        </Accordion>
  
        <Button
        size="large"
        style={[
          tw`bg-white border-black w-full rounded-none mt-12`,
          { borderLeftWidth: 0, borderRightWidth: 0 },
        ]}
        onPress={() => navigate("/register")}
      >
        Cerrar sesión
      </Button>
        <Menu />
      </View>

      </>
    )
  }
  