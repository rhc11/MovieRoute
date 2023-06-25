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
import { API_URL } from '@env'

type FormValues = {
  email: string
  password: string
}

type ResponseLogin = {
  data: {
    token: string
  }
}

export const Login = () => {
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
  const onFinish = async ({ email, password }: FormValues) => {
    try {
      // Send a POST request to the server with email and password data
      const response: ResponseLogin = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        }
      )
      // Set the token in localStorage
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

      {/* Formik form for login */}
      <Formik
        // Set initial form values
        initialValues={{ password: "", email: "" }}
        // Apply form validation schema
        validationSchema={Yup.object({
          password: Yup.string().required("Introduce la contraseña"),
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
            {/* Email TextInput */}
            <TextInput
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              autoFocus
              placeholder="Correo electrónico"
              style={[tw`bg-white w-full rounded-none h-12 pl-4`]}
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
            {/* Login Button */}
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
              Iniciar sesión
            </Button>
          </View>
        )}
      </Formik>

      {/* Registration Button */}
      <Button
        size="large"
        style={[
          tw`bg-primary border-black w-full rounded-none mt-12`,
          { borderLeftWidth: 0, borderRightWidth: 0 },
        ]}
        onPress={() => navigate("/register")}
      >
        Registrarse
      </Button>
      {/* StatusBar */}
      <StatusBar style="auto" />
    </View>
  )
}
