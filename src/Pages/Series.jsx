import { Center, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

import CardContent from "../components/CardContent";
import Genres from "../components/Genres";
import MaterialPagination from "../components/MaterialPagination";
import Sorting from "../components/Sorting";
import { useGenres } from "../utils/useGenres";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [numPage, setNumPage] = useState();
  const [sorting, setSorting] = useState("popularity.desc");

  const genresArray = useGenres(selectedGenres);

  useEffect(() => {
    const fetchSeries = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sorting}&include_adult=true&include_video=false&page=${page}&with_genres=${genresArray}`
      );
      setSeries(data.results);
      setNumPage(data.total_pages);
    };

    fetchSeries();
  }, [page, selectedGenres, sorting]);

  return (
    <>
      <Genres type="tv" genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <Sorting setSorting={setSorting} />
      <Flex flexWrap="wrap" justify={["center", "unset"]} gap={{ base: "3", lg: "10" }}>
        {series &&
          series.map((c, _i) => (
            <CardContent
              key={c.id}
              id={c.id}
              media_type="tv"
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

export default Series;
