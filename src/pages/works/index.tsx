import { CircularProgress, Grid, Heading } from "@chakra-ui/react";
import { Layout } from "src/components/common/Layout";
import { LgContainer } from "src/components/custom/LgContainer";
import { Card } from "src/components/works/Card";
import useUsers from "src/hooks/useUsers";
import useWorks from "src/hooks/useWorks";

export default function Works() {
  const { works, isLoading } = useWorks();
  const { users } = useUsers();
  return (
    <Layout title="投稿作品一覧">
      <LgContainer>
        <Heading textAlign={"center"}>投稿作品一覧</Heading>
        <Heading paddingBottom={2} marginY={20} borderBottom={"3px solid #ccc"}>
          全て
        </Heading>
        {!isLoading ? (
          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {works.map((work) => {
              const userInfo = users.find(
                (user) => user.userId === work.userId
              );
              return <Card key={work.id} work={work} user={userInfo} />;
            })}
          </Grid>
        ) : (
          <CircularProgress
            width={"100%"}
            height={"500px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            isIndeterminate
            color="teal.300"
            size="48px"
          />
        )}
      </LgContainer>
    </Layout>
  );
}
