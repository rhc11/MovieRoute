import { Button, Form, Input, Divider, Modal } from "antd-mobile"
import axios from "axios"
import { ExclamationCircleFill } from "antd-mobile-icons"
import { setDefaultConfig } from "antd-mobile"
import esES from "antd-mobile/es/locales/en-US"

setDefaultConfig({
  locale: esES,
})

type FormValues = {
  email: string
  password: string
}

export const Login = () => {
  const onFinish = async ({ email, password }: FormValues) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      })
      console.log(response.data)
    } catch (error) {
      Modal.alert({
        header: <ExclamationCircleFill className="text-6xl" />,
        title: "¡Ups! Vuelve a introduccir tu usuario y contraseña",
        closeOnMaskClick: true
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
          <Input type="email"  placeholder="Correo electrónico" clearable={true}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Introduce la contraseña" }]}
        >
          <Input type="password" placeholder="Contraseña" clearable={true}/>
        </Form.Item>
      </Form>

      <Button
        size="large"
        className="bg-primary text-black border-black w-full rounded-none border-x-0 mt-12"
      >
        Registrarse
      </Button>
    </div>
  )
}
