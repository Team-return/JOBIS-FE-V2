import styled from "@emotion/styled";
import { Icon, Text } from "@/components";
import type { Props } from "./FileDownload.types";
import { useState } from "react";

const Component = styled.div<Pick<Props, "$done">>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.color.grayScale[30]};
  padding: 4px 12px;
  border-radius: 8px;
  cursor: pointer;

  & > span {
    ${({ $done, theme }) =>
      $done &&
      `
      text-decoration: underline;
      text-decoration-color: ${theme.color.grayScale[60]};
    `}
  }
`;

export const FileDownload = ({ $label, $fileUrl }: Props) => {
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    if (!$fileUrl) return;

    const link = document.createElement("a");
    link.href = $fileUrl;
    link.download = $label || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDone(true);
  };
  return (
    <Component $done={done} onClick={handleDownload}>
      <Text $span $size="caption" $weight="regular" $color="#7F7F7F">
        {$label}
      </Text>
      <Icon icon={done ? "DownloadDone" : "Download"} size={16} />
    </Component>
  );
};
