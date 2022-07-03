import { Button, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CardContent from "../components/CardContent";
import MaterialPagination from "../components/MaterialPagination";

const Search = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [numPage, setNumPage] = useState();
  const [type, setType] = useState("movie");

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumPage(data.total_pages);
  };

  useEffect(() => {
    fetchSearch();
  }, [searchTerm, type, page]);

  return (
    <>
      <Flex gap="5" mb="10">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập tên phim bạn cần tìm kiếm"
          _placeholder={{ color: "black" }}
          shadow="xl"
        />
        <Button
          onClick={() => {
            fetchSearch();
            setSearchTerm("");
          }}
        >
          <BsSearch />
        </Button>
        <Button
          bgGradient="linear(to-t,red,green)"
          color="white"
          onClick={() => {
            setType("movie");
            toast.info("Tìm kiếm phim lẻ");
          }}
        >
          Phim lẻ
        </Button>
        <Button
          bgGradient="linear(to-t,red,green)"
          color="white"
          onClick={() => {
            setType("tv");
            toast.info("Tìm kiếm phim bộ");
          }}
        >
          Phim bộ
        </Button>
      </Flex>
      <Flex flexWrap="wrap" justify={["center", "unset"]} gap={{ base: "3", lg: "10" }}>
        {content &&
          content.map((c, _i) => (
            <CardContent
              key={c.id}
              id={c.id}
              media_type={type}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              vote_average={c.vote_average}
            />
          ))}
      </Flex>
      <MaterialPagination setPage={setPage} numPage={numPage} />
      <ToastContainer autoClose={1000} theme="colored" />
    </>
  );
};
export default Search;
