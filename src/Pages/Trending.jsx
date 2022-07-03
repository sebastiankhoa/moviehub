import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import CardContent from "../components/CardContent";
import MaterialPagination from "../components/MaterialPagination";
import Modals from "../components/Modals";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(`
      https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
      setContent(data.results);
    };

    fetchTrending();
  }, [page]);

  return (
    <>
      <Flex flexWrap="wrap" justify="center" gap={{ base: "3", lg: "10" }}>
        {content &&
          content.map((c, _i) => (
            <CardContent
              key={c.id}
              id={c.id}
              media_type={c.media_type}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average}
            />
          ))}
      </Flex>
      <MaterialPagination setPage={setPage} />
    </>
  );
};

export default Trending;
