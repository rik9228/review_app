import Link from "next/link";
import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" background={"#EBEBEB"} marginTop={"120px"}>
      <Container maxW="1200px" py={10} px={0} width={"calc(100% - 16px * 2)"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize="sm">©2022 Shaview. All Rights Reserved.</Text>
          <Box>
            <HStack spacing="40px">
              <Text fontSize="sm">
                <Link href="/about">
                  <a>こちらのサイトについて</a>
                </Link>
              </Text>
              <Text fontSize="sm">
                <Link href="/privacy">
                  <a>プライバシー</a>
                </Link>
              </Text>
              <Text fontSize="sm">
                <Link href="/term">
                  <a>利用規約</a>
                </Link>
              </Text>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
