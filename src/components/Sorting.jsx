import { Flex, Select, Text } from "@chakra-ui/react";
import React from "react";

const Sorting = ({ setSorting }) => {
  return (
    <Flex mb="5" justify="center" align="center" gap="4">
      <Text fontWeight="600">Sắp xếp theo:</Text>
      <Select w={{ base: "60%", md: "30%" }} fontWeight="600" onChange={(e) => setSorting(e.target.value)}>
        <option value="popularity.desc">Phổ biến nhất</option>
        <option value="release_date.desc">Mới nhất</option>
        <option value="vote_average.desc">Điểm số cao nhất</option>
      </Select>
    </Flex>
  );
};

export default Sorting;
