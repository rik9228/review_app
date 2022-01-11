import {
  Button,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Img,
  Flex,
} from "@chakra-ui/react";
import { Layout } from "src/components/common/Layout";
import { LgContainer } from "src/components/custom/LgContainer";
import TextEditor from "src/components/common/Editor";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "src/lib/firebase";
import { useAuth } from "src/lib/AuthProvider";

export default function New() {
  const initialValue = `
<h2>■ 作品概要</h2>
<br/>
<br/>
<h2>■ 工夫したところ</h2>
<br/>
<br/>
<h2>■ 気になっていること</h2>
<br/>
<br/>
<h2>■ その他</h2>
`;
  const router = useRouter();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [description, setDescription] = useState(initialValue);
  const now = Timestamp.now().toDate();

  const selectImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target);
        setImgSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitWork = async () => {
    try {
      let userName = currentUser!.displayName;
      let userId = currentUser!.uid;
      await addDoc(collection(db, "works"), {
        createdBy: userName,
        createdAt: now,
        title,
        imgSrc,
        shareLink,
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
    <Layout title="タイトル">
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
                minWidth={"220px"}
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
                minWidth={"220px"}
              >
                デザインカンプ共有URL：
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
                onChange={(e) => setShareLink(e.target.value)}
              />
            </FormControl>
            <FormControl display={"flex"} alignItems={"center"}>
              <FormLabel
                htmlFor="share"
                marginBottom={0}
                whiteSpace={"nowrap"}
                minWidth={"220px"}
              >
                デザインカンプ画像：
              </FormLabel>
              <>
                <Input
                  size="xs"
                  type={"file"}
                  border="none"
                  onChange={selectImg}
                />
              </>
            </FormControl>
            <Img
              src={imgSrc}
              width={"50%"}
              marginTop={"32px !important"}
              marginRight={"auto !important"}
              marginLeft={"auto !important"}
              display={"block"}
            />
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
          <TextEditor
            description={description}
            setDescription={setDescription}
          />
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
