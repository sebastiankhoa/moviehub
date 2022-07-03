import { Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { modalState } from "../atom/modal";
import { idState, trailerState, typeState } from "../atom/video";
import ContentModal from "./ModalContent";

const Modals = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const id = useRecoilValue(idState);
  const type = useRecoilValue(typeState);

  const [content, setContent] = useState();
  const [clip, setClip] = useState();

  // console.log({ content });

  //fetch data for modal
  const fetchModal = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

    setContent(data);
  };

  //fetch video
  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    console.log({ data });

    const index = data?.results.findIndex((item) => item.type === "Trailer");

    // console.log({ index });
    if (index >= 0) {
      setClip(data?.results[index]?.key);
    } else {
      setClip(data?.results[0]?.key);
    }
  };

  useEffect(() => {
    fetchModal();
    fetchVideo();
  }, [id]);

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} size="5xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="black" color="white" textAlign="center">
            {content?.original_name || content?.title}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody bg="black">
            <Flex w="100%" h="500px">
              {clip ? (
                <ContentModal videoUrl={clip} />
              ) : (
                <Center w="100%">
                  <Text textAlign="center" color="white" fontWeight="700" fontSize="30pt">
                    Không có trailer cho phim này :(
                  </Text>
                </Center>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter bg="black" color="white" pb="10">
            <Flex direction="column" w="100%" gap="2">
              {type === "tv" && (
                <Flex gap="5" align="center" justify="space-between">
                  <Text fontSize={["7pt", "9pt"]}>
                    Độ dài mỗi tập phim: <br /> {content?.last_episode_to_air?.runtime} phút
                  </Text>
                  <Text fontSize={["7pt", "9pt"]}>
                    Tổng số tập: <br /> {content?.last_episode_to_air?.episode_number}
                  </Text>
                  <Text fontSize={["7pt", "9pt"]}>
                    Ngày kết thúc series: <br /> {content?.last_episode_to_air?.air_date}{" "}
                  </Text>
                  <Text fontSize={["7pt", "9pt"]}>
                    Tổng công số tập: <br /> {content?.number_of_episodes}
                  </Text>
                  <Text fontSize={["7pt", "9pt"]}>
                    Số mùa: <br /> {content?.number_of_seasons}
                  </Text>
                </Flex>
              )}
              <Flex gap="5" align="center" justify="space-between">
                <Text fontSize={["7pt", "9pt"]}>
                  Ngày công chiếu: <br /> {content?.first_air_date}
                </Text>
                {/* <Text fontSize={["7pt", "9pt"]}>
                  Quốc gia: <br /> {content?.origin_country[0]}
                </Text> */}
                <Text fontSize={["7pt", "9pt"]}>
                  Ngôn ngữ phim: <br /> {content?.spoken_languages[0]?.name}
                </Text>
                <Text fontSize={["7pt", "9pt"]}>
                  Điểm đánh giá : <br /> {content?.vote_average}
                </Text>
                <Text fontSize={["7pt", "9pt"]}>
                  Số phiếu: <br /> {content?.vote_count}
                </Text>
              </Flex>
              <Flex direction="column" mt="5">
                <Text textAlign="center" fontWeight="700">
                  Nội dung phim:
                </Text>
                <Text fontSize={["7pt", "9pt"]}>{content?.overview}</Text>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Modals;
