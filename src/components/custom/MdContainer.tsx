import { Container, ContainerProps } from "@chakra-ui/react";
import { FC } from "react";

export const MdContainer: FC<ContainerProps> = (props) => {
  return (
    <Container
      maxW={"800px"}
      mx={"auto"}
      mt={[14, 20]}
      width={"calc(100% - 16px * 2)"}
      padding={0}
      {...props}
    />
  );
};
