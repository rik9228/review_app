import { useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

// import "quill-mention";
// import "quill-mention/dist/quill.mention.css";

// const atValues = [
//   { id: 1, value: "Fredrik Sundqvist" },
//   { id: 2, value: "Patrik Sjölin" },
// ];

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
  // mention: {
  //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  //   mentionDenotationChars: ["@", "#"],
  //   source: function (searchTerm, renderItem, mentionChar) {
  //     let values;
  //     if (mentionChar === "@" || mentionChar === "#") {
  //       values = atValues;
  //     }
  //     if (searchTerm.length === 0) {
  //       renderItem(values, searchTerm);
  //     } else {
  //       const matches = [];
  //       for (let i = 0; i < values.length; i++)
  //         if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
  //           matches.push(values[i]);
  //       renderItem(matches, searchTerm);
  //     }
  //   },
  // },
};

export const Editor = () => {
  const [value, setValue] = useState("");
  console.log(value);

  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      onChange={setValue}
      placeholder="Content goes here..."
    />
  );
};
