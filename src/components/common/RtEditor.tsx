import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

export const RtEditor = ({ description, setDescription }) => {
  return (
    <RichTextEditor
      value={description}
      onChange={setDescription}
      placeholder="レビュー内容を入力してください"
    />
  );
};
