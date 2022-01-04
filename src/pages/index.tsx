import { Layout } from "../components/common/Layout";
import { Box, Button, Heading, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Layout title="タイトル">
      <Box
        as="main"
        maxW={"800px"}
        margin={"0 auto"}
        marginTop={{ sm: "80px", md: "120px" }}
        width={"calc(100% - 16px * 2)"}
      >
        <Heading size={"2xl"} lineHeight={1.5} textAlign={"center"}>
          みんなで作る
          <br />
          ポートフォリオレビューサイト
        </Heading>
        <Text fontSize={"24px"} marginTop={10}>
          テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
        </Text>

        <Link href="works">
          <Button
            as="a"
            colorScheme={"blue"}
            borderRadius={2}
            margin={"0 auto"}
            fontSize={"lg"}
            paddingY={4}
            width={["100%", "80%"]}
            height={"100%"}
            display={"block"}
            marginTop={10}
            textAlign={"center"}
            cursor={"pointer"}
          >
            みんなのポートフォリオを見る
          </Button>
        </Link>

        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          marginTop={20}
          width={"100%"}
        >
          <Text>レビューを受けたい方はこちら</Text>
          <Flex
            marginTop={4}
            flexDirection={["column", "row"]}
            width={["100%", "auto"]}
          >
            <Link href="/login">
              <Button
                as="a"
                colorScheme={"white"}
                variant="outline"
                color={"#000"}
                borderRadius={2}
                paddingX={8}
                paddingY={6}
                cursor={"pointer"}
              >
                ログイン
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                as="a"
                colorScheme={"teal"}
                borderRadius={2}
                marginLeft={[0, 6]}
                marginTop={[4, 0]}
                paddingX={8}
                paddingY={6}
                cursor={"pointer"}
              >
                サインアップ
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}
