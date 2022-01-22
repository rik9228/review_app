import {
  Modal,
  ModalContent,
  ModalOverlay,
  Image,
  ModalCloseButton,
} from "@chakra-ui/react";
export const ImgModal = ({ isOpen, onClose, imgSrc }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton colorScheme={"teal"} />
        <Image src={imgSrc} />
      </ModalContent>
    </Modal>
  );
};
