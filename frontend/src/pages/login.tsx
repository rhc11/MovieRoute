import { Button, Form, Input, Divider, Modal } from "antd-mobile"
import axios from "axios"
import { ExclamationCircleFill } from "antd-mobile-icons"
import { setDefaultConfig } from "antd-mobile"
import esES from "antd-mobile/es/locales/en-US"
import { Link } from "react-router-dom"

// Set lenguage in Ant Design Modal
setDefaultConfig({
  locale: esES,
})

type FormValues = {
  email: string
  password: string
}

type ResponseLogin = {
  data: {
    token: string
  }
  message: string
}

export const AccessTokenKey = "accessToken"

// Define the onFinish function to handle form submission
export const Login = () => {
  // Define the onFinish function to handle form submission
  const onFinish = async ({ email, password }: FormValues) => {
    try {
      // Send a POST request to the server with email and password data
      const response: ResponseLogin = await axios.post(
        `http://localhost:8080/login`,
        {
          email,
          password,
        }
      )
      // Set the token in localStorage
      if (response.data) {
        localStorage.setItem(AccessTokenKey, response.data.token)
      }
    } catch (error) {
      // Show a modal dialog with an error message
      Modal.alert({
        header: <ExclamationCircleFill className="text-6xl" />,
        title: "¡Ups! Vuelve a introduccir tu usuario y contraseña",
        closeOnMaskClick: true,
      })
    }
  }

  // Render the Login component with a form and registration button
  return (
    <div className="h-screen w-screen bg-primary flex flex-col justify-center items-center">
      <img
        src="logo.png"
        alt="MovieRoute"
        className="object-contain w-1/3 mb-10"
      />

      <Divider />
      <Form
        layout="horizontal"
        className="w-full"
        onFinish={onFinish}
        footer={
          <Button
            type="submit"
            size="large"
            className="bg-black text-white border-black rounded-none absolute w-screen left-0"
          >
            Iniciar sesión
          </Button>
        }
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Introduce el email", type: "email" },
          ]}
        >
          <Input
            type="email"
            placeholder="Correo electrónico"
            clearable={true}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Introduce la contraseña" }]}
        >
          <Input type="password" placeholder="Contraseña" clearable={true} />
        </Form.Item>
      </Form>

      <Link to="/register" className="w-full">
        <Button
          size="large"
          className="bg-primary text-black border-black w-full rounded-none border-x-0 mt-12"
        >
          Registrarse
        </Button>
      </Link>
    </div>
  )
}
