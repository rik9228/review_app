import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/AuthProvider";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "src/lib/firebase";
import { MdBuild, MdCreate, MdLogout } from "react-icons/md";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    currentUser && setIsLogin(true);
    let unsubscribe = () => {};
    const getUserInfo = () => {
      const usersQuery = query(collection(db, "users"));
      unsubscribe = onSnapshot(usersQuery, (snapshot) => {
        const userDocs = snapshot.docs;
        userDocs.find((userDoc) => {
          if (currentUser && currentUser.uid === userDoc.data().userId) {
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
      <Container maxW="1080px" width={"calc(100% - 16px * 2)"} py={5} px={0}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading as="h1" size="md">
            <Link href="/">
              <a>シェビュー</a>
            </Link>
          </Heading>
          <Box>
            {isLogin && currentUser ? (
              <Menu>
                <Flex alignItems={"center"} gap={4}>
                  <Text>{displayName ?? ""}</Text>
                  <MenuButton
                    as={Button}
                    colorScheme="pink"
                    px={4}
                    py={2}
                    height={"auto"}
                  >
                    マイページ
                  </MenuButton>
                </Flex>
                <MenuList>
                  <MenuGroup>
                    <Link href="/profile">
                      <MenuItem>
                        <Text
                          as="a"
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <MdBuild />
                          プロフィールを編集
                        </Text>
                      </MenuItem>
                    </Link>
                    <Link href="/works/new">
                      <MenuItem>
                        <Text
                          as="a"
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                        >
                          <MdCreate />
                          <Text>レビュー依頼をする</Text>
                        </Text>
                      </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={() => logout()}>
                      <Text display={"flex"} alignItems={"center"} gap={2}>
                        <MdLogout />
                        ログアウト
                      </Text>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
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
