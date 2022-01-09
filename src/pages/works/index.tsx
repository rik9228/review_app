import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Layout } from "src/components/common/Layout";
import { LgContainer } from "src/components/custom/LgContainer";

export default function Works() {
  return (
    <Layout title="作品一覧">
      <LgContainer>
        <Heading textAlign={"center"}>投稿作品一覧</Heading>
      </LgContainer>
    </Layout>
  );
}
