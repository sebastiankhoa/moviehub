import { Container, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Modals from "./components/Modals";

import Navbar from "./components/Navbar";
import Movies from "./Pages/Movies";
import Search from "./Pages/Search";
import Series from "./Pages/Series";
import Trending from "./Pages/Trending";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Modals />
        <Container maxW="container.xl" py="100px">
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Flex w="100%" justify="center">
            <Navbar />
          </Flex>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
