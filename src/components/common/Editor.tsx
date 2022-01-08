import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";

const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" },
];

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],

  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@", "#"],
    source: function (searchTerm, renderList, mentionChar) {
      let values;

      if (mentionChar === "@") {
        values = atValues;
      } else {
        values = atValues;
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderList(matches, searchTerm);
      }
    },
  },
};

export const Editor = () => {
  const defaultTemplate: string = `
  <h2><strong>## 概要</strong></h2>
  <br/>
  <h2><strong>## 工夫したところ</strong></h2>
  <br/>
  <h2><strong>## 気になっているところ</strong></h2>
  <br/>
  <h2><strong>## その他</strong></h2>
  `;
  const [value, setValue] = useState(defaultTemplate);

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={setValue}
        placeholder="Content goes here..."
      />
      <Box>
        <Heading background={"#ccc"} marginTop={10} padding={2} fontSize={"xl"}>
          プレビュー
        </Heading>
        {/* <Box border={"1px solid #ccc"} padding={5}>
          <span dangerouslySetInnerHTML={{ __html: marked(value) }} />
        </Box> */}
      </Box>
    </>
  );
};
