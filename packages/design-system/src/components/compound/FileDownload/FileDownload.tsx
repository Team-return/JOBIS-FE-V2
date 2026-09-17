import styled from "@emotion/styled";
import { useTheme } from "@/hooks";
import { Icon, Text } from "@/components";
import type { Props } from "./FileDownload.types";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.color.grayScale[30]};
  padding: 4px 12px;
  border-radius: 8px;
`;

const PlainButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
`;

const DownloadButton = styled(PlainButton)`
  &:hover {
    text-decoration-line: underline;
    text-decoration-color: ${({ theme }) => theme.color.grayScale[60]};
  }
`;

export const FileDownload = ({
  label,
  fileUrl,
  $done = false,
  onRemove
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = label;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <DownloadButton type="button" onClick={handleDownload}>
        <Text
          $span
          $size="caption"
          $weight="regular"
          $color={theme.color.grayScale[60]}
          $underline={$done}
        >
          {label}
        </Text>
        <Icon icon={$done ? "DownloadDone" : "Download"} size={16} />
      </DownloadButton>
      {onRemove && (
        <PlainButton
          type="button"
          onClick={onRemove}
          aria-label={`${label} 삭제`}
        >
          <Icon icon="Close" size={16} fillColor={theme.color.grayScale[60]} />
        </PlainButton>
      )}
    </Container>
  );
};
