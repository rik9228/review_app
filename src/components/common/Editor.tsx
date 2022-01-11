import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import insert from "markdown-it-ins";
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

export const Editor = ({ description, setDescription }) => {
  return (
    <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={(e) => setDescription(e.html)}
      onImageUpload={onImageUpload}
      defaultValue={description}
    />
  );
};
