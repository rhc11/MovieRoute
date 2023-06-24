import { Button, Modal } from "@ant-design/react-native"
import { StatusBar } from "expo-status-bar"
import { View, Image, TextInput, Text } from "react-native"
import { tw } from "./../lib/tailwind"
import { Formik } from "formik"
import * as Yup from "yup"
import { AccessTokenKey, Session, jwtDecoded } from "../lib/jwtDecode"
import { useNavigate } from "react-router-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"

type FormValues = {
  nombre: string
  email: string
  password: string
  password2: string
}

type ResponseLogin = {
  data: {
    token: string
  }
}

export const Register = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      // Check if a session exists
      const session: Session | null = await jwtDecoded()
      if (session) {
        // Redirect to the home screen
        navigate("/home")
      }
    }
    checkSession()
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
        // Throw an error if passwords don't match
        throw new Error("Las contraseñas no coinciden")
      }
      // Send a POST request to the server with user registration data
      const response: ResponseLogin = await axios.post(
        `http://192.168.1.57:8080/usuario/`,
        {
          email,
          password,
          nombre,
        }
      )
      // Set the token in AsyncStorage
      if (response.data) {
        await AsyncStorage.setItem(AccessTokenKey, response.data.token)
        // Redirect to the home screen
        navigate("/home")
      }
    } catch (error) {
      // Show a modal dialog with an error message
      Modal.alert("¡Ups!", "Usuario y/o contraseña incorrectos", [
        { text: "Cerrar" },
      ])
    }
  }

  return (
    <View style={tw`flex-1 items-center justify-center bg-primary`}>
      {/* Display the logo */}
      <Image
        source={require("./../assets/logo.png")}
        alt="MovieRoute"
        style={tw`h-1/8 w-1/3 mb-10`}
        resizeMode="contain"
      />

      {/* Formik form for registration */}
      <Formik
        // Set initial form values
        initialValues={{ nombre: "", password: "", password2: "", email: "" }}
        // Apply form validation schema
        validationSchema={Yup.object({
          nombre: Yup.string().required("Introduce el nombre"),
          password: Yup.string().required("Introduce la contraseña"),
          password2: Yup.string().required("Introduce la misma contraseña"),
          email: Yup.string()
            .email("Email inválido")
            .required("Introduce el email"),
        })}
        // Handle form submission
        onSubmit={async (values, formikActions) => {
          await onFinish(values)

          formikActions.setSubmitting(false)
        }}
      >
        {(props) => (
          <View style={tw`w-full`}>
            {/* Nombre TextInput */}
            <TextInput
              onChangeText={props.handleChange("nombre")}
              onBlur={props.handleBlur("nombre")}
              value={props.values.nombre}
              autoFocus
              placeholder="Nombre"
              style={[tw`bg-white w-full rounded-none h-12 pl-4`]}
            />
            {/* Display nombre validation error */}
            {props.touched.nombre && props.errors.nombre ? (
              <Text style={[tw`text-rose-600 mt-2 ml-2`]}>
                {props.errors.nombre}
              </Text>
            ) : null}
            {/* Email TextInput */}
            <TextInput
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              placeholder="Correo electrónico"
              style={[tw`bg-white w-full rounded-none mt-12 h-12 pl-4`]}
            />
            {/* Display email validation error */}
            {props.touched.email && props.errors.email ? (
              <Text style={[tw`text-rose-600 mt-2 ml-2`]}>
                {props.errors.email}
              </Text>
            ) : null}
            {/* Password TextInput */}
            <TextInput
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              placeholder="Contraseña"
              style={[tw`bg-white w-full rounded-none mt-12 h-12 pl-4`]}
              secureTextEntry
            />
            {/* Display password validation error */}
            {props.touched.password && props.errors.password ? (
              <Text style={[tw`text-rose-600 mt-2 ml-2`]}>
                {props.errors.password}
              </Text>
            ) : null}
            {/* Confirm Password TextInput */}
            <TextInput
              onChangeText={props.handleChange("password2")}
              onBlur={props.handleBlur("password2")}
              value={props.values.password2}
              placeholder="Contraseña"
              style={[tw`bg-white w-full rounded-none mt-12 h-12 pl-4`]}
              secureTextEntry
            />
            {/* Display password2 validation error */}
            {props.touched.password2 && props.errors.password2 ? (
              <Text style={[tw`text-rose-600 mt-2 ml-2`]}>
                {props.errors.password2}
              </Text>
            ) : null}
            {/* Register Button */}
            <Button
              onPress={() => props.handleSubmit()}
              loading={props.isSubmitting}
              disabled={props.isSubmitting}
              type="primary"
              style={[
                tw`bg-black border-0 w-full rounded-none mt-12`,
                { borderLeftWidth: 0, borderRightWidth: 0 },
              ]}
              activeStyle={[tw`bg-gray-700`]}
            >
              Registrarse
            </Button>
          </View>
        )}
      </Formik>

      {/* Login Button */}
      <Button
        size="large"
        style={[
          tw`bg-primary border-black w-full rounded-none mt-12`,
          { borderLeftWidth: 0, borderRightWidth: 0 },
        ]}
        onPress={() => navigate("/login")}
      >
        Iniciar sesión
      </Button>
      {/* StatusBar */}
      <StatusBar style="auto" />
    </View>
  )
}
