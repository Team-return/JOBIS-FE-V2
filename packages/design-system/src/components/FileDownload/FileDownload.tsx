import styled from "@emotion/styled";
import { Icon, Text } from "@/components";
import type { Props } from "./FileDownload.types";

const Component = styled.button<Pick<Props, "$done">>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.color.grayScale[30]};
  padding: 4px 12px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-family: inherit;
  &:hover {
    opacity: 0.7;
  }
`;

export const FileDownload = ({ label, fileUrl, $done = false }: Props) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = label;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Component type="button" onClick={handleDownload} $done={$done}>
      <Text
        $span
        $size="caption"
        $weight="regular"
        $color="#7F7F7F"
        $underline={$done}
      >
        {label}
      </Text>
      <Icon icon={$done ? "DownloadDone" : "Download"} size={16} />
    </Component>
  );
};
