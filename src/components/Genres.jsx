import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Genres = ({ genres, setGenres, selectedGenres, setSelectedGenres, type }) => {
  //   console.log({ genres });
  // console.log(selectedGenres);
  const [actives, setActives] = useState(false);
  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  const clickHandler = (genres) => {
    if (!selectedGenres.includes(genres)) {
      setSelectedGenres([...selectedGenres, genres]);
    } else {
      setSelectedGenres(selectedGenres.filter((s) => s.id !== genres.id));
    }
  };

  const resetHandle = () => {
    setSelectedGenres([]);
  };

  return (
    <Flex direction="column" mb="5" align="center" display={{ base: "none", md: "flex" }}>
      <Flex h="100px" gap="4" justify="center" flexWrap="wrap" mt="5" mx="10" mb={{ base: "300px", md: "20px", lg: "0" }}>
        {genres &&
          genres.map((gen, _id) => (
            <Button
              color="red.800"
              variant="unstyled"
              key={_id}
              transition="0.5s"
              onClick={() => {
                clickHandler(gen);
              }}
              _hover={{ color: "green" }}
            >
              {gen.name}
            </Button>
          ))}
      </Flex>
      <Flex gap="5" h="50px" align="center" shadow="lg" px="5" rounded="xl" flexWrap="wrap" w="100%" mb="2">
        <Text fontWeight="600" fontSize={{ base: "8pt", lg: "13pt" }}>
          Thể loại phim đã chọn:
        </Text>
        {selectedGenres &&
          selectedGenres.map((gen, _id) => (
            <Box key={_id}>
              <Text fontSize={{ base: "8pt", lg: "13pt" }}>{gen.name}</Text>
            </Box>
          ))}
      </Flex>
      <Button colorScheme="facebook" w="80px" onClick={resetHandle} rounded="xl">
        Reset
      </Button>
    </Flex>
  );
};

export default Genres;
