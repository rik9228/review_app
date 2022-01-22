import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import insert from "markdown-it-ins";
import { memo } from "react";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mdParser = new MarkdownIt().use(insert);
function onImageUpload(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (data) => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
}

const Editor = ({ description, setDescription, height = "400px" }) => {
  return (
    <MdEditor
      style={{ height: height }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={(e) => setDescription(e.html)}
      onImageUpload={onImageUpload}
      defaultValue={description}
      placeholder="メッセージを入力してください"
    />
  );
};

export default memo(Editor);
