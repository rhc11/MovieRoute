import { Camera, CameraType } from "expo-camera"
import { useRef, useState } from "react"
import { tw } from "../lib/tailwind"
import { Text, View } from "react-native"
import { Button, Icon } from "@ant-design/react-native"
import * as MediaLibrary from "expo-media-library"
import * as Location from "expo-location"
import * as ImageManipulator from "expo-image-manipulator"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AccessTokenKey } from "../lib/jwtDecode"
import axios from "axios"

type Props = {
  usuarioEmail: string
  paradaId: string
  setFinish: React.Dispatch<React.SetStateAction<boolean>>
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Camara: React.FC<Props> = ({
  usuarioEmail,
  paradaId,
  setFinish,
  setCameraVisible,
}) => {
  // Define state variables and hooks
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const [onTake, setOnTake] = useState(false)
  const [onFail, setOnFail] = useState(false)
  const camaraRef = useRef<Camera>(null)

  // If no camera permission, render nothing
  if (!permission) {
    return <View />
  }

  // If camera permission not granted, request for permission
  if (!permission.granted) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <Text style={tw`text-center mb-6`}>
          We need permission to access the camera
        </Text>
        <Button
          style={tw`bg-primary text-black border-primary w-full rounded-none`}
          onPress={() => {
            requestPermission
            MediaLibrary.requestPermissionsAsync()
            Location.requestForegroundPermissionsAsync()
          }}
        >
          Grant permissions
        </Button>
      </View>
    )
  }

  // Function to toggle between front and back camera
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  // Function to take a picture
  const takePicutre = async () => {
    setOnTake(true)
    try {
      // Get location data
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })
      
      const { latitude, longitude } = location.coords

      // Take picture with camera
      const data = await camaraRef.current?.takePictureAsync({
        exif: true,
        additionalExif: {
          GPSLatitude: latitude,
          GPSLongitude: longitude,
        },
      })

      if (data?.uri) {
        // Rotate and compress the image
        const rotatedData = await ImageManipulator.manipulateAsync(
          data.uri,
          [{ rotate: -90 }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        )

        // Save the image in the MediaLibrary
        const fotoUrl = await MediaLibrary.createAssetAsync(rotatedData?.uri)

        // Get the JWT token from AsyncStorage
        const token = await AsyncStorage.getItem(AccessTokenKey)
        
        // Post the image data to the server
        const response = await axios.post(
          `http://192.168.1.57:8080/completado/`,
          {
            usuarioEmail,
            paradaId,
            foto: fotoUrl.uri,
            coords: {
              latitude,
              longitude,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.data) {
          setFinish(true)
          setCameraVisible(false)
        } else {
          setOnFail(true)
        }
      }
    } catch (error) {
      console.log(error)
    }

    setOnTake(false)
  }

  // Return the camera view with buttons for taking picture, changing camera type and changing flash mode
  return (
    <View style={tw`flex-1 z-0 bg-black`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`aspect-1/1 w-full rounded-lg`}>
          <Camera
            style={tw`flex-1`}
            type={type}
            ref={camaraRef}
            ratio="1:1"
            flashMode={flash}
          ></Camera>
        </View>
      </View>
      <Button
        style={[
          tw`border-black rounded-full h-20 w-20 z-1 p-0 ${
            onTake ? "bg-white" : "bg-primary"
          }`,
          {
            position: "absolute",
            bottom: 60,
            left: "50%",
            transform: [{ translateX: -40 }],
          },
        ]}
        disabled={onTake}
        onPress={takePicutre}
      >
        <Icon name="camera" color="black" size="lg" />
      </Button>
      <Button
        style={[
          tw`border-black rounded-full h-10 w-10 z-1 p-0`,
          {
            position: "absolute",
            bottom: 80,
            left: "65%",
          },
        ]}
        onPress={toggleCameraType}
      >
        <Icon name="sync" color="black" />
      </Button>
      <Button
        style={[
          tw`border-black rounded-full h-10 w-10 z-1 p-0 ${
            flash === Camera.Constants.FlashMode.on ? "bg-primary" : ""
          }`,
          {
            position: "absolute",
            bottom: 80,
            right: "65%",
          },
        ]}
        onPress={() => {
          flash === Camera.Constants.FlashMode.on
            ? setFlash(Camera.Constants.FlashMode.off)
            : setFlash(Camera.Constants.FlashMode.on)
        }}
      >
        <Icon name="thunderbolt" color="black" />
      </Button>
      {onFail && (
        <Button
          style={[
            tw`border-black rounded-full h-10 z-1`,
            {
              position: "absolute",
              top: 150,
              left: "27%",
            },
          ]}
          onPress={() => {
            setOnFail(false)
          }}
        >
          <Text>Acércate más a la parada</Text>
        </Button>
      )}
    </View>
  )
}
