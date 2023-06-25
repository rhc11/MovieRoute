import { View, TextInput } from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { Accordion, Button, Modal } from "@ant-design/react-native"
import { useNavigate } from "react-router-native"
import { Text } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AccessTokenKey, Session, jwtDecoded } from "../lib/jwtDecode"
import * as Yup from "yup"
import { Formik } from "formik"
import axios from "axios"
import { API_URL } from "@env"

type FormValuesChangePassword = {
  password: string
  password2: string
}

type FormValuesDelete = {
  email: string
}

type ResponseUpdated = {
  data: {
    token: string
  }
}

export const User = () => {
  // Get the navigation function from react-router
  const navigate = useNavigate()

  const [session, setSession] = useState<Session | null>(null)

  // State to keep track of active accordion sections
  const [activeSections, setActiveSections] = useState<
    Array<number> | undefined
  >(undefined)

  useEffect(() => {
    const checkSession = async () => {
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }
    checkSession()
  }, [])

  // Function to update active accordion sections state
  const onChange = (activeSection: Array<number>) => {
    setActiveSections(activeSection)
  }

  // Define the onChangePassword function to handle form submission
  const onChangePassword = async ({
    password,
    password2,
  }: FormValuesChangePassword) => {
    try {
      if (password !== password2) {
        // Throw an error if passwords don't match
        throw new Error("Las contraseñas no coinciden")
      }

      const token = await AsyncStorage.getItem(AccessTokenKey)
      // Send a UPDATE request to the server with user registration data
      const response: ResponseUpdated = await axios.patch(
        `${API_URL}/usuario/`,
        {
          email: session ? session.email : "",
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      Modal.alert("¡Ups!", "Contraseña no válida", [{ text: "Cerrar" }])
    }
  }

  // Define the onChangePassword function to handle form submission
  const onDelete = async ({ email }: FormValuesDelete) => {
    try {
      console.log(email, "   ", session?.email)
      if (email !== session?.email) {
        // Throw an error if passwords don't match
        throw new Error("El email no es correcto")
      }

      const token = await AsyncStorage.getItem(AccessTokenKey)

      // Send a UPDATE request to the server with user registration data
      const response = await axios.delete(
        `${API_URL}/usuario/${session.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // Set the token in AsyncStorage
      if (response.data) {
        await AsyncStorage.setItem(AccessTokenKey, "")
        navigate("/login")
      }
    } catch (error) {
      // Show a modal dialog with an error message
      Modal.alert("¡Ups!", "El email no es correcto", [{ text: "Cerrar" }])
    }
  }

  return (
    <>
      <View style={{ flex: 1, zIndex: 1 }}>
        <Text style={tw`m-6 text-2xl font-black`}>Cuenta</Text>
        <Accordion onChange={onChange} activeSections={activeSections}>
          <Accordion.Panel header="Preferencias">
            Aquí van las preferencias
          </Accordion.Panel>
          <Accordion.Panel header="Cambiar contraseña">
            {/* Formik form for registration */}
            <Formik
              // Set initial form values
              initialValues={{ password: "", password2: "" }}
              // Apply form validation schema
              validationSchema={Yup.object({
                password: Yup.string().required(
                  "Introduce la nueva contraseña"
                ),
                password2: Yup.string().required(
                  "Introduce la misma nueva contraseña"
                ),
              })}
              // Handle form submission
              onSubmit={async (values, formikActions) => {
                await onChangePassword(values)

                formikActions.setSubmitting(false)
              }}
            >
              {(props) => (
                <View style={tw`w-full`}>
                  {/* Password TextInput */}
                  <TextInput
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}
                    placeholder="Nueva contraseña"
                    style={[tw`bg-white w-full h-12 pl-4`]}
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
                    placeholder="Repetir nueva contraseña"
                    style={[tw`bg-white w-full h-12 pl-4`]}
                    secureTextEntry
                  />
                  {/* Display password2 validation error */}
                  {props.touched.password2 && props.errors.password2 ? (
                    <Text style={[tw`text-rose-600 mt-2 ml-2`]}>
                      {props.errors.password2}
                    </Text>
                  ) : null}
                  {/* Save Button */}
                  <Button
                    onPress={() => props.handleSubmit()}
                    loading={props.isSubmitting}
                    disabled={props.isSubmitting}
                    type="primary"
                    style={[
                      tw`bg-black border-0 w-full rounded-none`,
                      { borderLeftWidth: 0, borderRightWidth: 0 },
                    ]}
                    activeStyle={[tw`bg-gray-700`]}
                  >
                    Guardar contraseña
                  </Button>
                </View>
              )}
            </Formik>
          </Accordion.Panel>
          <Accordion.Panel header="Soporte">
            Text text text text text text text text text text text text text
            text text
          </Accordion.Panel>
          <Accordion.Panel header="Eliminar cuenta">
            <Formik
              // Set initial form values
              initialValues={{ email: "" }}
              // Apply form validation schema
              validationSchema={Yup.object({
                email: Yup.string().required("Introduce el correo electrónico"),
              })}
              // Handle form submission
              onSubmit={async (values, formikActions) => {
                await onDelete(values)

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
                    placeholder="Introduce tu correo electrónico para eliminar la cuenta"
                    style={[tw`bg-white w-full h-12 pl-4`]}
                  />
                  {/* Display email validation error */}
                  {props.touched.email && props.errors.email ? (
                    <Text style={[tw`text-rose-600 mt-2 ml-2`]}>
                      {props.errors.email}
                    </Text>
                  ) : null}
                  <Button
                    onPress={() => props.handleSubmit()}
                    loading={props.isSubmitting}
                    disabled={props.isSubmitting}
                    type="primary"
                    style={[tw`bg-rose-500 border-0 w-full rounded-none`]}
                    activeStyle={[tw`bg-gray-700`]}
                  >
                    Eliminar cuenta
                  </Button>
                </View>
              )}
            </Formik>
          </Accordion.Panel>
        </Accordion>

        <Button
          size="large"
          style={[
            tw`bg-white border-black w-full rounded-none mt-12`,
            { borderLeftWidth: 0, borderRightWidth: 0 },
          ]}
          onPress={async () => {
            await AsyncStorage.setItem(AccessTokenKey, "")
            navigate("/login")
          }}
        >
          Cerrar sesión
        </Button>
        <Menu />
      </View>
    </>
  )
}
