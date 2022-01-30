import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "src/components/common/Layout";
import { LgContainer } from "src/components/custom/LgContainer";
import { useWork } from "src/hooks/useWork";
import { format } from "date-fns";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { User } from "src/types/User";
import useReviews from "src/hooks/useReviews";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "src/lib/firebase";
import { Reviewee } from "src/components/workDetail/Reviewee";
import { Reviewer } from "src/components/workDetail/Reviewer";
import RtEditor from "src/components/common/RtEditor";
import { useToast } from "@chakra-ui/react";
import useUser from "src/hooks/useUser";
import Link from "next/link";

export default function Work() {
  const { work, isLoading } = useWork();
  const { user, currentUser } = useUser();
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState<User>();
  const toast = useToast();

  const {
    query: { workId },
  } = useRouter();
  const now = Timestamp.now().toDate();
  const { reviews } = useReviews(workId);

  useEffect(() => {
    currentUser ? console.log(currentUser) : console.log("foo");
  }, []);

  const addReview = async () => {
    // 入力値が空の場合は送信させない
    if (description === "<p><br></p>") {
      toast({
        title: "入力値が空です。",
        status: "error",
        isClosable: true,
      });
    } else {
      const reviewCollectionRef = collection(db, `works/${workId}/reviews`);
      try {
        await addDoc(reviewCollectionRef, {
          createdAt: now,
          description: description,
          reviewedBy: currentUser.uid,
          userInfo: {
            displayName: user.displayName,
            isOnline: user.isOnline,
            classNumber: user.classNumber,
            profileImg: user.profileImg,
          },
        });
        setDescription("");
        toast({
          title: "レビューが送信されました。",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteReview = async (reviewId) => {
    confirm("レビューを削除しますか？") &&
      (await deleteDoc(doc(db, `works/${workId}/reviews/${reviewId}`)));
  };

  return (
    <Layout title="作品詳細">
      <LgContainer>
        {isLoading && <p>Loading...</p>}
        {work && (
          <Box marginTop={20}>
            <Heading as="h2" textAlign={"center"}>
              {work.title}
            </Heading>
            <Flex
              marginTop={20}
              alignItems={"center"}
              flexDirection={["column", "row"]}
            >
              <Text fontSize={"sm"} marginLeft={[0, 4]}>
                更新日：{format(work.createdAt.toDate(), "yyyy年MM月dd日")}
              </Text>
              <Link href={`/works/${work.id}/edit`}>
                <Button
                  as="a"
                  colorScheme="blue"
                  variant="solid"
                  marginLeft={["none", "auto"]}
                  cursor={"pointer"}
                  width={["full", "auto"]}
                  mt={[4, 0]}
                >
                  レビュー内容を更新
                </Button>
              </Link>
            </Flex>
            <AspectRatio
              maxW="1080px"
              width={"100%"}
              marginTop={"20px"}
              ratio={16 / 10}
            >
              <iframe src={work.iFrameLink}></iframe>
            </AspectRatio>

            <Stack spacing={5} marginTop={10}>
              {createdBy && (
                <>
                  <Text>氏名：{createdBy.displayName}</Text>
                  <Text>
                    受講期：{createdBy.isOnline ? "オンライン" : ""}
                    {createdBy.classNumber}期
                  </Text>
                </>
              )}

              <Flex>
                <Text>共有リンク：</Text>
                <Link href={work.shareLink}>
                  <a target="_blank" rel="noopener">
                    {work.shareLink}
                    <ExternalLinkIcon
                      display={"inline-block"}
                      marginLeft={2}
                      marginBottom={1}
                    />
                  </a>
                </Link>
              </Flex>
            </Stack>

            <Box
              className="c-description"
              marginTop={20}
              dangerouslySetInnerHTML={{ __html: work.description }}
            />

            {currentUser ? (
              <>
                <Box mt={40}>
                  <Heading
                    as="h3"
                    _before={{
                      content: `"■"`,
                    }}
                    fontSize={"2xl"}
                    marginBottom={5}
                  >
                    レビュー
                  </Heading>
                  <RtEditor
                    description={description}
                    setDescription={setDescription}
                  />
                  <Button
                    colorScheme={"teal"}
                    display={"block"}
                    ml={"auto"}
                    mt={8}
                    onClick={addReview}
                  >
                    レビューする
                  </Button>
                </Box>

                <Box>
                  <Heading
                    as="h3"
                    _before={{
                      content: `"■"`,
                    }}
                    fontSize={"2xl"}
                    marginBottom={5}
                    mt={40}
                    mb={"64px"}
                  >
                    レビュー内容
                  </Heading>
                  {reviews && work && (
                    <>
                      {reviews.length ? (
                        <>
                          {reviews.map((review) => {
                            const isCreated = review.reviewedBy === work.userId;
                            return (
                              <Box
                                key={review.docId}
                                _notFirst={{ marginTop: "24px" }}
                              >
                                {isCreated ? (
                                  <Reviewee
                                    deleteReview={deleteReview}
                                    createdAt={format(
                                      review.createdAt.toDate(),
                                      "yyyy年MM月dd日hh時mm分"
                                    )}
                                    description={review.description}
                                    reviewId={review.docId}
                                    user={review.userInfo}
                                  />
                                ) : (
                                  <Reviewer
                                    deleteReview={deleteReview}
                                    createdAt={format(
                                      review.createdAt.toDate(),
                                      "yyyy年MM月dd日hh時mm分"
                                    )}
                                    description={review.description}
                                    reviewId={review.docId}
                                    user={review.userInfo}
                                  />
                                )}
                              </Box>
                            );
                          })}
                        </>
                      ) : (
                        <Text textAlign={"center"} fontSize={"lg"}>
                          レビューはまだありません。
                        </Text>
                      )}
                    </>
                  )}
                </Box>
              </>
            ) : (
              <Box mt={40}>
                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  marginTop={20}
                  width={"100%"}
                >
                  <Text>レビューを受けたい方はログインしてください。</Text>
                  <Flex
                    marginTop={4}
                    flexDirection={["column", "row"]}
                    width={["100%", "auto"]}
                  >
                    <Link href="/login">
                      <Button
                        as="a"
                        colorScheme={"white"}
                        variant="outline"
                        color={"#000"}
                        borderRadius={2}
                        paddingX={8}
                        paddingY={6}
                        cursor={"pointer"}
                      >
                        ログイン
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        as="a"
                        colorScheme={"teal"}
                        borderRadius={2}
                        marginLeft={[0, 6]}
                        marginTop={[4, 0]}
                        paddingX={8}
                        paddingY={6}
                        cursor={"pointer"}
                      >
                        サインアップ
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
              </Box>
            )}
          </Box>
        )}
      </LgContainer>
    </Layout>
  );
}
