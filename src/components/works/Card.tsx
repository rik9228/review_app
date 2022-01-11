import { Box, Button, Heading, Img, Stack, Text } from "@chakra-ui/react";
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
      <Box padding={6}>
        <Heading as="h3" fontSize={"lg"}>
          {user.displayName}さん&nbsp;ポートフォリオ
        </Heading>
        <Text marginTop={4}>投稿日時：{formattedCreatedAt}</Text>
        <Text marginTop={2}>
          受講期：{user.isOnline && "オンライン"}
          {user.classNumber}期
        </Text>
        <Button
          marginTop={4}
          width={"100%"}
          colorScheme={"blue"}
          onClick={() => router.push(`/works/${work.id}`)}
        >
          詳細を見る
        </Button>
      </Box>
    </Box>
  );
};
