import dynamic from "next/dynamic";
import parse from "html-react-parser";
import { useMemo, useState } from "react";
import { Flex, Box, Button, Heading } from "@chakra-ui/react";
import { AiFillEye } from "react-icons/Ai";

const SSRNoWrapperRichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

const people = [
  { id: 1, value: "Bill Horsefighter" },
  { id: 2, value: "Amanda Hijacker" },
  { id: 3, value: "Leo Summerhalter" },
  { id: 4, value: "Jane Sinkspitter" },
];

function Editor({ description, setDescription }) {
  const [isOpen, setIsOpen] = useState(false);
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-zsÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        const list = mentionChar === "@" && people;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm);
      },
    }),
    []
  );

  const togglePreview = () => {
    !isOpen ? setIsOpen(true) : setIsOpen(false);
  };

  return (
    <>
      <SSRNoWrapperRichTextEditor
        value={description}
        onChange={setDescription}
        mentions={mentions}
        controls={[
          ["bold", "italic", "underline", "link"],
          ["unorderedList", "h1", "h2", "h3"],
          ["alignLeft", "alignCenter", "alignRight"],
          ["video", "image"],
        ]}
      />
      <Flex justifyContent={"flex-end"} marginTop={4}>
        <Button leftIcon={<AiFillEye />} onClick={togglePreview}>
          プレビューを開く
        </Button>
      </Flex>

      {/* {isOpen && (
        <Box
          border={"1px solid #ccc"}
          borderRadius={4}
          marginTop={10}
          className="ql-snow mantine-1mriphm"
        >
          <Heading as="h3" fontSize={"lg"} padding={5} background={"#ccc"}>
            プレビュー
          </Heading>
          <Box padding={5} className="ql-editor">
            {parse(value)}
          </Box>
        </Box>
      )} */}
    </>
  );
}

export default Editor;
