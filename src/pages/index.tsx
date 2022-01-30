import { Layout } from "../components/common/Layout";
import { Button, Heading, Flex, Text } from "@chakra-ui/react";
import { MdContainer } from "src/components/custom/MdContainer";
import Link from "next/link";
import { useAuth } from "src/lib/AuthProvider";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <Layout title="タイトル">
      <MdContainer>
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

        {!currentUser && (
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
        )}
      </MdContainer>
    </Layout>
  );
}
