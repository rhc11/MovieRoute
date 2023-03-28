import { ConfigProvider } from "antd-mobile"
import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import './index.css'
import esES from 'antd-mobile/es/locales/en-US'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider locale={esES}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
