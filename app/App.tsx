import { Provider } from "@ant-design/react-native"
import { Router } from "./Router"
import esES from '@ant-design/react-native/lib/locale-provider/es_ES'

export default function App() {
  return (
    <Provider locale={esES}>
      <Router />
    </Provider>
  )
}
