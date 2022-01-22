import { Avatar, Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImgModal } from "./ImgModal";

export const Reviewer = ({
  createdAt,
  description,
  user,
  deleteReview,
  reviewId,
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mouseOverHandler = (e) => {
    const img = e.target.closest("img");
    if (img && e.currentTarget.contains(img)) {
      img.classList.add("is-active");
      img.addEventListener("click", () => {
        setImgSrc(img.src);
        onOpen();
      });
    }
  };

  const mouseOutHandler = (e) => {
    const img = e.target.closest("img");
    if (img && e.currentTarget.contains(img)) {
      img.classList.remove("is-active");
    }
  };

  return (
    <>
      <ImgModal isOpen={isOpen} onClose={onClose} imgSrc={imgSrc} />

      <Flex>
        <Flex flexDirection={"column"} alignItems={"center"} minW={"140px"}>
          <Avatar src={user.profileImg}></Avatar>
          <Text whiteSpace={"nowrap"} mt={4}>
            {user.isOnline && "オン"}
            {user.classNumber}期
          </Text>
          <Text>{user.displayName}</Text>
        </Flex>
        <Box>
          <Text
            className="p-review-txt"
            color={"#fff"}
            padding={5}
            backgroundColor={"#3182ce"}
            dangerouslySetInnerHTML={{ __html: description }}
            borderRadius={5}
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
          />
          <Text
            mt={4}
            fontSize={"sm"}
            textAlign={"right"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            marginTop={5}
          >
            投稿日時：{createdAt}
            <Box
              as="span"
              _hover={{ color: "teal" }}
              onClick={() => deleteReview(reviewId)}
            >
              <RiDeleteBinLine
                fontSize={"26px"}
                display={"inline-block"}
                cursor={"pointer"}
              />
            </Box>
          </Text>
        </Box>
      </Flex>
    </>
  );
};
