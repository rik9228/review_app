import React, { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { NextPage } from "next";
import { Layout } from "../components/common/Layout";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "src/lib/AuthProvider";

const Signup: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const currentUser = useAuth();
  const { loginWithGoogle, createUser } = useAuth();
  const isAllInputsFilled = !!email && !!password && !!userName;

  useEffect(() => {
    currentUser && router.push("/works");
  }, [router]);

  return (
    <Layout title="新規登録">
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
          <Heading fontSize={"4xl"}>アカウント作成</Heading>
          <Flex>
            <Text>アカウントをお持ちの方</Text>
            <Link href="/login">
              <Button
                as="a"
                cursor={"pointer"}
                variant={"unstyled"}
                color={"#587FFF"}
                ml={4}
              >
                ログイン
              </Button>
            </Link>
          </Flex>
          <FormControl id="email">
            <FormLabel>Eメール</FormLabel>
            <Input
              type="email"
              placeholder="example@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="username">
            <FormLabel>表示名</FormLabel>
            <Input
              type="username"
              placeholder="田中 太郎"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              required
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
                createUser(userName, email, password);
              }}
              disabled={!isAllInputsFilled}
            >
              サインアップ
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
                  Googleアカウントでサインアップ
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Stack>
        <Box>
          <Image
            alt={"Login Image"}
            src={"/icon_login_02.svg"}
            display={{ sm: "none", md: "block" }}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default Signup;
