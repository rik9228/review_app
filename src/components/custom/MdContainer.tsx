import { Container, ContainerProps } from "@chakra-ui/react";
import { FC } from "react";

export const MdContainer: FC<ContainerProps> = (props) => {
  return (
    <Container
      maxW={"800px"}
      margin={"0 auto"}
      marginTop={{ sm: "56px", md: "80px" }}
      width={"calc(100% - 16px * 2)"}
      padding={0}
      {...props}
    />
  );
};
