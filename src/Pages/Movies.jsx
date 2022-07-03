import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import CardContent from "../components/CardContent";
import Genres from "../components/Genres";
import MaterialPagination from "../components/MaterialPagination";
import { useGenres } from "../utils/useGenres";

import { videoState } from "../atom/video";
import Sorting from "../components/Sorting";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [numPage, setNumPage] = useState();
  const [sorting, setSorting] = useState("popularity.desc");

  const video = useRecoilState(videoState);
  // console.log("video state in movies page:", video);

  const genresArray = useGenres(selectedGenres);

  // console.log({ movies });

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sorting}&include_adult=true&include_video=false&page=${page}&with_genres=${genresArray}`
      );
      setMovies(data.results);
      setNumPage(data.total_pages);
    };
    fetchMovies();
  }, [page, genresArray, sorting]);

  return (
    <>
      <Genres type="movie" genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <Sorting setSorting={setSorting} />
      <Flex flexWrap="wrap" justify={["center", "unset"]} gap={{ base: "3", lg: "10" }}>
        {movies &&
          movies.map((c, _i) => (
            <CardContent
              key={c.id}
              id={c.id}
              media_type="movie"
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average}
            />
          ))}
      </Flex>
      <MaterialPagination setPage={setPage} numPage={numPage} />
    </>
  );
};

export default Movies;
