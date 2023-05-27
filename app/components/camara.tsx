import { Camera, CameraType } from "expo-camera"
import { useEffect, useRef, useState } from "react"
import { tw } from "../lib/tailwind"
import { Text, View } from "react-native"
import { Button, Icon } from "@ant-design/react-native"
import * as MediaLibrary from "expo-media-library"

export const Camara = () => {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const camaraRef = useRef<Camera>(null)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <Text style={tw`text-center mb-6`}>
          Necesitamos permisos para acceder a la cámara
        </Text>
        <Button
          style={tw`bg-primary text-black border-primary w-full rounded-none`}
          onPress={() => {
            requestPermission
            MediaLibrary.requestPermissionsAsync()
          }}
        >
          Conceder permisos
        </Button>
      </View>
    )
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  const takePicutre = async () => {
    if (camaraRef) {
      try {
        const data = await camaraRef.current?.takePictureAsync()

        if (data?.uri) {
          await MediaLibrary.createAssetAsync(data?.uri)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

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
          tw`border-black rounded-full h-20 w-20 z-1 p-0 bg-primary`,
          {
            position: "absolute",
            bottom: 60,
            left: "50%",
            transform: [{ translateX: -40 }],
          },
        ]}
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
    </View>
  )
}
