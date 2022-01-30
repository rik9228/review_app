import { Container, ContainerProps } from "@chakra-ui/react";
import { FC } from "react";

export const SmContainer: FC<ContainerProps> = (props) => {
  return (
    <Container
      maxW={"650px"}
      mx={"auto"}
      mt={[14, 20]}
      width={"calc(100% - 16px * 2)"}
      padding={0}
      {...props}
    />
  );
};
