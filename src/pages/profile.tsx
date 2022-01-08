import {
  Avatar,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "src/components/common/Layout";
import { useAuth } from "src/lib/AuthProvider";
import { db } from "src/lib/firebase";

export default function Profile() {
  const currentUser = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("");
  const [classNumber, setClassNumber] = useState<string>("1");
  const [bio, setBio] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string>("");

  useEffect(() => {
    currentUser && setProfileImg(currentUser.currentUser.photoURL);
    currentUser && setDisplayName(currentUser.currentUser.displayName);
    currentUser && setBio("よろしくお願いします。");
  }, []);

  const setIsOnlineHandler = (e: string) => {
    if (e === "1") {
      setIsOnline(false);
    } else {
      setIsOnline(true);
    }
  };

  const selectImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        setProfileImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const acceptProfile = async () => {
    try {
      let userID = currentUser.currentUser!.uid;
      await setDoc(doc(db, "users", userID), {
        userID,
        displayName,
        classNumber,
        bio,
        isOnline,
        profileImg,
      });
      alert("ユーザーを登録しました");
      router.push('/works');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err);
      }
    }
  };
  return (
    <Layout title="プロファイル">
      <Container maxW={"650px"} marginTop={{ sm: "80px", md: "120px" }}>
        <Heading textAlign={"center"}>プロフィール</Heading>
        <Flex justifyContent={"space-between"} marginTop={["56px", "80px"]}>
          <Stack direction="column" justifyContent={"space-between"}>
            <FormControl display={"flex"} alignItems={"center"}>
              <FormLabel htmlFor="text" marginBottom={0} whiteSpace={"nowrap"}>
                表示名：
              </FormLabel>
              <Input
                id="text"
                type="text"
                variant={"unstyled"}
                borderBottom={"1px"}
                borderRadius={"none"}
                width={"100%"}
                paddingY={"5px"}
                placeholder="田中 太郎"
                defaultValue={displayName}
              />
            </FormControl>
            <RadioGroup
              defaultValue="1"
              onChange={(e) => setIsOnlineHandler(e)}
            >
              <Stack spacing={5} direction="row">
                <Radio value="1">通学生</Radio>
                <Radio value="2">オンライン</Radio>
              </Stack>
            </RadioGroup>
            <Flex alignItems={"center"}>
              <FormLabel htmlFor="text" marginBottom={0}>
                受講期：
              </FormLabel>
              <NumberInput
                defaultValue={1}
                min={1}
                onChange={(e) => setClassNumber(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <FormControl>
              <FormLabel htmlFor="message" marginBottom={3}>
                一言メッセージ：
              </FormLabel>
              <Input
                id="message"
                type="text"
                variant={"unstyled"}
                borderBottom={"1px"}
                borderRadius={"none"}
                width={"auto"}
                placeholder="よろしくお願いします。"
                minWidth={"100%"}
                paddingY={"5px"}
                defaultValue={"よろしくお願いします。"}
                onChange={(e) => setBio(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Stack spacing={4} direction={"column"} alignItems={"center"} ml={6}>
            <Text>プロフィール画像</Text>
            <Avatar boxSize="150px" src={profileImg} />
            <>
              <Input
                size="xs"
                type={"file"}
                border="none"
                onChange={selectImg}
              />
            </>
          </Stack>
        </Flex>
        <Button
          colorScheme={"teal"}
          width={"75%"}
          display={"block"}
          marginX={"auto"}
          marginTop={["56px", "80px"]}
          padding={5}
          height={"100%"}
          onClick={acceptProfile}
        >
          確定
        </Button>
        {/* <Button onClick={(e) => alert(isOnline)}>確認</Button> */}
      </Container>
    </Layout>
  );
}
