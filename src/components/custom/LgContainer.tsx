import { Container, ContainerProps } from "@chakra-ui/react";
import { FC } from "react";

export const LgContainer: FC<ContainerProps> = (props) => {
  return (
    <Container
      maxW={"1080px"}
      mx={"auto"}
      mt={[14, 20]}
      width={"calc(100% - 16px * 2)"}
      padding={0}
      {...props}
    />
  );
};
