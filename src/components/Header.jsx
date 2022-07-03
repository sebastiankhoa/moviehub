import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

const Header = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const isScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", isScroll);

    return () => {
      window.removeEventListener("scroll", isScroll);
    };
  }, []);

  return (
    <Flex
      bg={scroll ? "blackAlpha.500" : "black"}
      h="80px"
      justify="center"
      align="center"
      pos="fixed"
      w="100%"
      zIndex="100"
      shadow="lg"
      onClick={() => window.scroll(0, 0)}
      cursor="pointer"
    >
      <Text color="white" fontWeight="700" fontSize={["20pt", "25pt"]}>
        🎬 Movies Hub 🎥
      </Text>
    </Flex>
  );
};

export default Header;
