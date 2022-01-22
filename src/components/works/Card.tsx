import { Box, Button, Heading, Img, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { User } from "src/types/User";
import { Work } from "src/types/Work";
import Link from "next/link";

type Props = {
  work: Work;
  user: User;
};

export const Card = ({ work, user }: Props) => {
  const formattedCreatedAt = format(work.createdAt.toDate(), "yyyy年MM月dd日");

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Img
        src={work.image}
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
        {/* as で表示はそのまま。 pathname、query で　リンク先に渡したいパラメーターを設定 */}
        <Link href={`/works/${work.id}`}>
          <Button
            as="a"
            marginTop={4}
            width={"100%"}
            colorScheme={"blue"}
            cursor={"pointer"}
          >
            詳細を見る
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
