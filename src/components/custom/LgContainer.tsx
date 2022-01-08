import { Container, ContainerProps } from "@chakra-ui/react";
import { FC } from "react";

export const LgContainer: FC<ContainerProps> = (props) => {
  return (
    <Container
      maxW={"1080px"}
      margin={"0 auto"}
      marginTop={{ sm: "80px", md: "120px" }}
      width={"calc(100% - 16px * 2)"}
      {...props}
    />
  );
};
