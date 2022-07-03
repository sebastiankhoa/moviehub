import { Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import { MdLocalMovies, MdMonitor, MdSearch } from "react-icons/md";
import { SiHotjar } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Tabs pos="fixed" bottom="0" w="100%" variant="soft-rounded" colorScheme="green" align="center" zIndex="99" pb="2">
      <TabList>
        <Tab
          gap="2"
          color="white"
          flexDirection="column"
          onClick={() => {
            navigate("/");
            toast.info("Phim hot nhất trong tháng");
          }}
        >
          <SiHotjar />
          <Text>Trending</Text>
        </Tab>
        <Tab
          gap="2"
          color="white"
          flexDirection="column"
          onClick={() => {
            navigate("/movies");
            toast.info("Trang tổng hợp phim lẻ");
          }}
        >
          <MdLocalMovies />
          <Text>Phim lẻ</Text>
        </Tab>
        <Tab
          gap="2"
          color="white"
          flexDirection="column"
          onClick={() => {
            navigate("/series");
            toast.info("Trang tổng hợp phim bộ");
          }}
        >
          <MdMonitor />
          <Text>Phim bộ</Text>
        </Tab>
        <Tab
          gap="2"
          color="white"
          flexDirection="column"
          onClick={() => {
            navigate("/search");
            toast.info("Bạn đang ở trang tìm kiếm phim");
          }}
        >
          <MdSearch size="1.5rem" />
          <Text>Search</Text>
        </Tab>
      </TabList>
      <ToastContainer autoClose={1000} theme="colored" position="bottom-center" />
    </Tabs>
  );
};

export default Navbar;
