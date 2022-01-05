import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { NextPage } from "next";
import { Layout } from "../components/common/Layout";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../lib/AuthProvider";

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const currentUser = useAuth();
  const { loginWithGoogle, loginWithEmailAndPassword } = useAuth();

  useEffect(() => {
    currentUser && router.push("/works");
  }, [router]);

  return (
    <Layout title="ログイン">
      <Container
        maxW="800px"
        width={"calc(100% - 16px * 2)"}
        py={10}
        px={0}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"4xl"}>ログイン</Heading>
          <Flex>
            <Text>新規ユーザーの方ですか？</Text>
            <Link href="/signup">
              <Button
                as="a"
                cursor={"pointer"}
                variant={"unstyled"}
                color={"#587FFF"}
                ml={4}
              >
                アカウント作成
              </Button>
            </Link>
          </Flex>
          <FormControl id="email">
            <FormLabel>Eメール</FormLabel>
            <Input
              type="email"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              {/* <Link color={"blue.500"}>Forgot password?</Link> */}
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={(e) => {
                e.preventDefault();
                loginWithEmailAndPassword(email, password);
              }}
            >
              ログイン
            </Button>

            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text
                display={"flex"}
                alignItems={"center"}
                gap={10}
                _before={{
                  content: `""`,
                  width: "48px",
                  height: "1px",
                  background: "#ccc",
                  display: "block",
                }}
                _after={{
                  content: `""`,
                  width: "48px",
                  height: "1px",
                  background: "#ccc",
                  display: "block",
                }}
              >
                または
              </Text>
              <Flex mt={5}>
                <Button
                  leftIcon={<FcGoogle />}
                  px={10}
                  onClick={loginWithGoogle}
                >
                  Googleアカウントでログイン
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Stack>
        <Box>
          <Image
            alt={"Login Image"}
            src={"/icon_login_01.svg"}
            display={{ sm: "none", md: "block" }}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
