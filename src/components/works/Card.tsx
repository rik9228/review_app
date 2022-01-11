import { Box, Button, Heading, Img, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { User } from "src/types/User";
import { Work } from "src/types/Work";

type Props = {
  work: Work;
  user: User;
};

export const Card = ({ work, user }: Props) => {
  const router = useRouter();
  const formattedCreatedAt = format(work.createdAt.toDate(), "yyyy年MM月dd日");

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Img
        src={work.imgSrc}
        width={"100%"}
        height={"200px"}
        objectFit={"cover"}
        objectPosition={"top"}
      />
      <Heading as="h3">{work.title}</Heading>
      <Text>投稿日時：{formattedCreatedAt}</Text>
      <Text>受講期：{user.displayName}</Text>
      <Button onClick={() => router.push("/works/:workId")}>詳細を見る</Button>
    </Box>
  );
};
