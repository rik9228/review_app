import dynamic from "next/dynamic";
import { memo } from "react";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

const RtEditor = ({ description, setDescription }) => {
  return (
    <RichTextEditor
      controls={[
        ["bold", "italic", "underline", "link", "image", "blockquote"],
        ["unorderedList", "h1", "h2", "h3"],
        ["sup", "sub"],
        ["code", "codeBlock"],
        ["alignLeft", "alignCenter", "alignRight"],
      ]}
      value={description}
      onChange={setDescription}
      placeholder="レビュー内容を入力してください"
    />
  );
};

export default memo(RtEditor);
