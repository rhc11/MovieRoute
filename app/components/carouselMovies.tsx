import { Parada } from "../models/Parada"
import React, { useEffect } from "react"
import {
  Image,
  FlatList,
  Linking,
  TouchableWithoutFeedback,
} from "react-native"
import { tw } from "../lib/tailwind"
import axios from "axios"

type Props = {
  paradas: { parada: Parada }[]
}

type Movie = {
  url: string
  image: string
}

export const CarouselMovies: React.FC<Props> = ({ paradas }) => {
  const [movieObjects, setMovieObjects] = React.useState<Movie[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const todasLasObras = paradas.map((item) => item.parada.obras).flat()
      const obrasUnicas = Array.from(new Set(todasLasObras))

      const promises = obrasUnicas.map(async (obra) => {
        const movieObject = await axios.get(
          `https://api.themoviedb.org/3/search/multi`,
          {
            params: {
              query: obra,
              language: "es-ES",
              include_adult: false,
            },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTNkMWE0YjhkYTRhMjE1ZDMzZDdhYjkxYTIzYTY4NyIsInN1YiI6IjY0N2EwN2VlZTMyM2YzMDE0ODE1ZmUwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.texCY06QkJ_qH8O6MaDWwAO-OiEYy__FmMVY3d9hTo8",
            },
          }
        )

        if (!movieObject.data || movieObject.data.results.length === 0)
          return {
            url: `https://www.themoviedb.org/`,
            image: `https://i.pinimg.com/736x/3c/da/02/3cda023744095eeb3c3acc6df3d3e323.jpg`,
          }

        return {
          url:
            movieObject.data.results[0].media_type === "movie"
              ? `https://www.themoviedb.org/movie/${movieObject.data.results[0].id}`
              : `https://www.themoviedb.org/tv/${movieObject.data.results[0].id}`,
          image: `https://image.tmdb.org/t/p/w500${movieObject.data.results[0].poster_path}`,
        }
      })

      try {
        const results = await Promise.all(promises)
        setMovieObjects(results)
      } catch (error) {
        console.error("Error fetching movie data:", error)
        setMovieObjects([])
      }
    }

    fetchData()
  }, [paradas])

  if (!movieObjects || movieObjects.length === 0) return <></>

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={movieObjects}
      style={tw`w-full`}
      horizontal
      renderItem={({ item }: { item: Movie; index: number }) => {
        const handlePress = () => {
          Linking.openURL(item.url)
        }

        return (
          <TouchableWithoutFeedback onPress={handlePress}>
            <Image
              style={tw`mx-1 rounded-lg w-24 h-38`}
              resizeMode="cover"
              source={{
                uri: item.image,
              }}
              key={item.image}
            />
          </TouchableWithoutFeedback>
        )
      }}
    />
  )
}
