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
import { LgContainer } from "src/components/custom/LgContainer";
import { Editor } from "src/components/common/Editor";
import { ChangeEvent, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "src/lib/firebase";
import { useAuth } from "src/lib/AuthProvider";

export default function New() {
  const initialValue = `## 作品概要\n\n## 工夫したところ\n\n## 気になっていること\n\n## その他`;
  const router = useRouter();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [iFrameLink, setIFrameLink] = useState("");
  const [description, setDescription] = useState(initialValue);
  const now = Timestamp.now().toDate();

  const setShareLinkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const shareLink = e.target.value;
    setShareLink(shareLink);
    const replcedShareLink = shareLink.replace("view", "embed"); // 埋め込み用リンクに書き換え
    setIFrameLink(replcedShareLink);
  };

  const submitWork = async () => {
    try {
      let userId = currentUser!.uid;
      await addDoc(collection(db, "works"), {
        createdAt: now,
        title,
        shareLink,
        iFrameLink,
        userId,
      });
      alert("作品を投稿しました");
      router.push("/works");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err);
      }
    }
  };

  return (
    <Layout title="新規作品投稿">
      <LgContainer>
        <Heading textAlign={"center"}>新規作品投稿</Heading>
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
                minWidth={"240px"}
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
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl display={"flex"} alignItems={"center"}>
              <FormLabel
                htmlFor="img"
                marginBottom={0}
                whiteSpace={"nowrap"}
                minWidth={"240px"}
              >
                デザイン共有URL：
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
                onChange={(e) => setShareLinkHandler(e)}
              />
            </FormControl>

            {/* <FormControl display={"flex"} alignItems={"center"}>
              <FormLabel
                htmlFor="img"
                marginBottom={0}
                whiteSpace={"nowrap"}
                minWidth={"240px"}
              >
                デザイン共有コード（iFrame）：
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
                onChange={(e) => {
                  extractIFrameLink(e);
                }}
              />
            </FormControl> */}
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
          <Editor description={description} setDescription={setDescription} />
        </Box>
        <Button
          colorScheme={"teal"}
          width={"75%"}
          display={"block"}
          marginX={"auto"}
          marginTop={["56px", "80px"]}
          padding={5}
          height={"100%"}
          onClick={submitWork}
        >
          確定
        </Button>
      </LgContainer>
    </Layout>
  );
}
