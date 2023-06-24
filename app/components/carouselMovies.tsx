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

// Type definition for the component's props
type Props = {
  paradas: { parada: Parada }[]
}

// Type definition for the movie object
type Movie = {
  url: string
  image: string
}

// Function component definition
export const CarouselMovies: React.FC<Props> = ({ paradas }) => {
  // State declaration for the list of movies
  const [movieObjects, setMovieObjects] = React.useState<Movie[]>([])

  // Effect hook to fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Extract all 'obras' from the 'paradas' prop and flatten the resulting array
      const todasLasObras = paradas.map((item) => item.parada.obras).flat()
      // Remove duplicate 'obras'
      const obrasUnicas = Array.from(new Set(todasLasObras))

      // Create an array of promises to fetch data for each unique 'obra'
      const promises = obrasUnicas.map(async (obra) => {
        // Fetch data from the API
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

        // If no results found, return a default object
        if (!movieObject.data || movieObject.data.results.length === 0)
          return {
            url: `https://www.themoviedb.org/`,
            image: `https://i.pinimg.com/736x/3c/da/02/3cda023744095eeb3c3acc6df3d3e323.jpg`,
          }

        // Return an object with the movie's URL and image
        return {
          url:
            movieObject.data.results[0].media_type === "movie"
              ? `https://www.themoviedb.org/movie/${movieObject.data.results[0].id}`
              : `https://www.themoviedb.org/tv/${movieObject.data.results[0].id}`,
          image: `https://image.tmdb.org/t/p/w500${movieObject.data.results[0].poster_path}`,
        }
      })

      // Resolve all promises and set the state with the results
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

  // Render nothing if there are no movie objects
  if (!movieObjects || movieObjects.length === 0) return <></>

  // Render the movie carousel
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
