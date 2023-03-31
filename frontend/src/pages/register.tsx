import { Button, Form, Input, Divider, Modal } from "antd-mobile"
import axios from "axios"
import { ExclamationCircleFill } from "antd-mobile-icons"
import { setDefaultConfig } from "antd-mobile"
import esES from "antd-mobile/es/locales/en-US"
import { Link, useNavigate } from "react-router-dom"
import { AccessTokenKey, jwtDecoded, Session } from "../helpers/jwtDecode"
import { useEffect } from "react"

// Set lenguage in Ant Design Modal
setDefaultConfig({
  locale: esES,
})

type FormValues = {
  nombre: string
  email: string
  password: string
  password2: string
}

export const Register = () => {
  const session: Session | null = jwtDecoded()
  const navigate = useNavigate()

  useEffect(() => {
    if(session) {
      navigate("/home")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // Define the onFinish function to handle form submission
  const onFinish = async ({
    nombre,
    email,
    password,
    password2,
  }: FormValues) => {
    try {
      if (password !== password2) {
        throw new Error("Las contraseñas no coinciden")
      }
      // Send a POST request to the server with email and password data
      const response = await axios.post("http://localhost:8080/usuario/", {
        email,
        password,
        nombre,
      })
      if (response.data) {
        localStorage.setItem(AccessTokenKey, response.data.token)
        navigate("/home")
      }
    } catch (error) {
      // Show a modal dialog with an error message
      Modal.alert({
        header: <ExclamationCircleFill className="text-6xl" />,
        title: "¡Ups! Vuelve a introduccir tus datos",
        closeOnMaskClick: true,
      })
      console.log(error)
    }
  }

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
            Registrarse
          </Button>
        }
      >
        <Form.Item
          name="nombre"
          rules={[{ required: true, message: "Introduce el nombre" }]}
        >
          <Input placeholder="Nombre" clearable={true} />
        </Form.Item>
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
        <Form.Item
          name="password2"
          rules={[{ required: true, message: "Introduce la contraseña" }]}
        >
          <Input
            type="password"
            placeholder="Repetir contraseña"
            clearable={true}
          />
        </Form.Item>
      </Form>

      <Link to="/login" className="w-full">
        <Button
          size="large"
          className="bg-primary text-black border-black w-full rounded-none border-x-0 mt-12"
        >
          Iniciar sesión
        </Button>
      </Link>
    </div>
  )
}
