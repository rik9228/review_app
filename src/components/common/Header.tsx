import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/AuthProvider";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "src/lib/firebase";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    currentUser && setIsLogin(true);
    let unsubscribe = () => {};
    const getUserInfo = () => {
      const usersQuery = query(collection(db, "users"));
      unsubscribe = onSnapshot(usersQuery, (snapshot) => {
        const userDocs = snapshot.docs;
        userDocs.find((userDoc) => {
          if (currentUser.uid === userDoc.data().userId) {
            setDisplayName(userDoc.data().displayName);
          }
        });
      });
    };
    getUserInfo();
    return () => unsubscribe();
  }, [router]);

  return (
    <header className="flex p-5 pl-8 space-x-4">
      <Container maxW="1080px" width={"calc(100% - 16px * 2)"} py={10} px={0}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading as="h1" size="md">
            <Link href="/">
              <a>シェビュー</a>
            </Link>
          </Heading>
          <Box>
            {isLogin ? (
              <HStack spacing="24px">
                <Link href="/works/new">
                  <Button
                    as="a"
                    colorScheme="teal"
                    borderRadius={3}
                    cursor={"pointer"}
                    display={["none", "flex"]}
                  >
                    レビュー依頼をする
                  </Button>
                </Link>
                <Flex display={["none", "flex"]}>
                  こんにちは、
                  {displayName ?? ""}
                  さん
                </Flex>
                <Link href="/profile">
                  <Avatar
                    as="a"
                    name="Dan Abrahmov"
                    width={"40px"}
                    height={"40px"}
                    src={
                      currentUser.photoURL ??
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    cursor={"pointer"}
                  />
                </Link>
              </HStack>
            ) : (
              <HStack spacing="24px">
                <Link href="/login">
                  <Button
                    as="a"
                    colorScheme="teal"
                    variant="outline"
                    borderRadius={3}
                    cursor={"pointer"}
                  >
                    ログイン
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    as="a"
                    colorScheme="teal"
                    borderRadius={3}
                    cursor={"pointer"}
                  >
                    サインアップ
                  </Button>
                </Link>
              </HStack>
            )}
          </Box>
        </Flex>
      </Container>
    </header>
  );
};
