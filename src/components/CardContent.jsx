import { Badge, Flex, Image, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

import { modalState } from "../atom/modal";
import { idState, typeState } from "../atom/video";
import { img_300, unavailable } from "../utils/picture_dummy";

const CardContent = ({ id, media_type, poster, title, date, vote_average }) => {
  const setModal = useSetRecoilState(modalState);
  const setId = useSetRecoilState(idState);
  const setType = useSetRecoilState(typeState);

  return (
    <>
      <Flex
        w="250px"
        h="350px"
        shadow="xl"
        rounded="20px"
        overflow="hidden"
        pos="relative"
        _hover={{ transform: "scale(1.1)" }}
        transition="0.5s"
        role="group"
        cursor="pointer"
        onClick={() => {
          setModal((prev) => !prev);
          setId(id);
          setType(media_type);
        }}
      >
        <Image alt="poster" src={poster ? `${img_300}${poster}` : `${unavailable}`} w="full" />
        <Flex
          direction="column"
          pos="absolute"
          bottom="0"
          w="100%"
          justify="center"
          align="center"
          bg="blackAlpha.400"
          h="80px"
          px="1"
          display="none"
          _groupHover={{ display: "flex" }}
          transition="1s"
          className="scale-up-ver-bottom"
          gap="1"
        >
          <Text color="white" fontSize="10pt" fontWeight="600">
            {title}
          </Text>
          <Flex align="center" justify="space-evenly" w="100%">
            <Text color="white" fontSize="8pt">
              Ngày chiếu: {date}
            </Text>
            {media_type && (
              <Text color="white" fontSize="8pt">
                {media_type === "movie" ? "Phim lẻ" : "Phim bộ"}
              </Text>
            )}
          </Flex>
        </Flex>
        <Badge pos="absolute" rounded="full" bg={vote_average >= 5 ? "green" : "red"} color="white" top="1" right="2" zIndex="80">
          {vote_average.toFixed(1)}
        </Badge>
      </Flex>
    </>
  );
};

export default CardContent;
