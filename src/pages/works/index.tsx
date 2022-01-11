import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Layout } from "src/components/common/Layout";
import { LgContainer } from "src/components/custom/LgContainer";
import { Card } from "src/components/works/Card";
import useUsers from "src/hooks/useUsers";
import useWorks from "src/hooks/useWorks";

export default function Works() {
  const { works } = useWorks();
  const { users } = useUsers();

  return (
    <Layout title="投稿作品一覧">
      <Heading textAlign={"center"}>投稿作品一覧</Heading>
      <LgContainer>
        <Heading
          paddingBottom={2}
          marginBottom={10}
          borderBottom={"3px solid #ccc"}
        >
          全て
        </Heading>
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {works.map((work, index) => {
            const userInfo = users.find((user) => user.userId === work.userId);
            return <Card key={index} work={work} user={userInfo} />;
          })}
        </Grid>
      </LgContainer>
    </Layout>
  );
}
