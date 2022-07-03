import React from "react";
import { Pagination } from "@material-ui/lab";
import { Flex } from "@chakra-ui/react";

const MaterialPagination = ({ setPage, numPage = 10 }) => {
  const handleChangePage = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <Flex justify="center" w="100%" mt="10">
      <Pagination
        onChange={(e) => handleChangePage(e.target.textContent)}
        count={numPage}
        color="secondary"
        hidePrevButton={true}
        hideNextButton={true}
      />
    </Flex>
  );
};

export default MaterialPagination;
