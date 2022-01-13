import { Box, Heading, Stack } from "@chakra-ui/react";
import { Layout } from "src/components/common/Layout";
import { LgContainer } from "src/components/custom/LgContainer";

export default function Work() {
  return (
    <Layout title="作品詳細">
      <LgContainer>
        <Heading textAlign={"center"}>作品詳細</Heading>
        <Box marginTop={["56px", "80px"]}></Box>
      </LgContainer>
    </Layout>
  );
}
