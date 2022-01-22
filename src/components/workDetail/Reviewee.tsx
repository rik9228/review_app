import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";

export const Reviewee = ({
  createdAt,
  description,
  user,
  deleteReview,
  reviewId,
}) => {
  return (
    <Flex flexDirection={"row-reverse"}>
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
          padding={5}
          backgroundColor={"#fff"}
          border={"1px solid #b9b9b9"}
          color={"#0a0a0a"}
          borderRadius={5}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Text
          mt={4}
          textAlign={"right"}
          fontSize={"sm"}
          display={"flex"}
          alignItems={"center"}
          gap={2}
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
  );
};
