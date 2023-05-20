import { Parada } from "../models/Parada"
import React from 'react'
import { Image, FlatList, TouchableOpacity } from 'react-native'
import { tw } from "../lib/tailwind"

type Props = {
  paradas: { parada: Parada }[]
}

export const CarouselMovies: React.FC<Props> = ({ paradas }) => {

  const todasLasObras = paradas.map((item) => item.parada.obras).flat()

  const obrasUnicas = Array.from(new Set(todasLasObras))

  if (obrasUnicas.length === 0) return <></>

  return (
    <FlatList
        showsHorizontalScrollIndicator={false}
        data={obrasUnicas}
        style={tw`w-full`}
        horizontal
        renderItem={({item}: {item: string, index: number}) => {
            return (
                <Image
                    style={tw`mx-2 rounded-lg w-24 h-38`}
                    resizeMode= 'cover'
                    source={{
                        uri: item,
                    }}
                    key={item}
                />
            )
        }}
      />
  )
}
