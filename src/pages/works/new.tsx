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
import { ChangeEvent, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "src/lib/firebase";
import { useAuth } from "src/lib/AuthProvider";
import RtEditor from "src/components/common/RtEditor";

export default function New() {
  const initialValue = `
  <h2>作品概要</h2>
  <br/>
  <br/>
  <h2>工夫したところ</h2>
  <br/>
  <br/>
  <h2>気になっていること</h2>
  <br/>
  <br/>
  <h2>その他</h2>
  <br/>
  <br/>
  `;

  const router = useRouter();
  const now = Timestamp.now().toDate();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [iFrameLink, setIFrameLink] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState(initialValue);

  const fetchLinkPreview = async () => {
    let result;
    const key = "bb76800dc727d49004e78fa6efbac1a8";
    const linkPreviewResource = { key, q: link };

    try {
      result = fetch("https://api.linkpreview.net", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(linkPreviewResource),
      }).then((data) => data.json());
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        result = "";
      }
    } finally {
      return result;
    }
  };

  const setShareLinkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const shareLink = e.target.value;
    setShareLink(shareLink);
    const replcedShareLink = shareLink.replace("view", "embed"); // 埋め込み用リンクに書き換え
    setIFrameLink(replcedShareLink);
    setLink(replcedShareLink);
  };

  const submitWork = async () => {
    await fetchLinkPreview();
    const { image } = await fetchLinkPreview();
    try {
      let userId = currentUser!.uid;

      await addDoc(collection(db, "works"), {
        createdAt: now,
        title,
        shareLink,
        iFrameLink,
        image,
        userId,
        description,
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
          <RtEditor description={description} setDescription={setDescription} />
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
