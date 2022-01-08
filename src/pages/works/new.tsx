import {
  Button,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { Layout } from "src/components/common/Layout";
import { Editor } from "src/components/common/Editor";
import { LgContainer } from "src/components/custom/LgContainer";

export default function New() {
  return (
    <Layout title="タイトル">
      <LgContainer>
        <Heading textAlign={"center"}>プロフィール</Heading>
        <Box marginTop={["56px", "80px"]}>
          <Stack
            direction="column"
            justifyContent={"space-between"}
            spacing={8}
          >
            <FormControl display={"flex"} alignItems={"center"}>
              <FormLabel
                htmlFor="title"
                marginBottom={0}
                whiteSpace={"nowrap"}
                minWidth={"180px"}
              >
                タイトル：
              </FormLabel>
              <Input
                id="title"
                type="text"
                variant={"unstyled"}
                borderBottom={"1px"}
                borderRadius={"none"}
                width={"100%"}
                paddingY={"5px"}
                placeholder="タイトルが入ります。"
              />
            </FormControl>
            <FormControl display={"flex"} alignItems={"center"}>
              <FormLabel
                htmlFor="share"
                marginBottom={0}
                whiteSpace={"nowrap"}
                minWidth={"180px"}
              >
                デザイン共有URL：
              </FormLabel>
              <Input
                id="share"
                type="text"
                variant={"unstyled"}
                borderBottom={"1px"}
                borderRadius={"none"}
                width={"100%"}
                paddingY={"5px"}
                placeholder="http://example.com"
              />
            </FormControl>
            <FormControl display={"flex"} alignItems={"center"}>
              <FormLabel
                htmlFor="img"
                marginBottom={0}
                whiteSpace={"nowrap"}
                minWidth={"180px"}
              >
                デザインカンプ画像：
              </FormLabel>
              <Input
                id="img"
                type="text"
                variant={"unstyled"}
                borderBottom={"1px"}
                borderRadius={"none"}
                width={"100%"}
                paddingY={"5px"}
                placeholder="http://example.com"
              />
            </FormControl>
          </Stack>
          <Heading
            as="h3"
            marginTop={10}
            marginBottom={5}
            _before={{
              content: `"■"`,
            }}
            fontSize={"2xl"}
          >
            相談内容
          </Heading>
          <Editor></Editor>
        </Box>
        <Button
          colorScheme={"teal"}
          width={"75%"}
          display={"block"}
          marginX={"auto"}
          marginTop={["56px", "80px"]}
          padding={5}
          height={"100%"}
        >
          確定
        </Button>
      </LgContainer>
    </Layout>
  );
}
