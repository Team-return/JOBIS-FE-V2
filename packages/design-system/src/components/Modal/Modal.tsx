import { useEffect } from "react";
import styled from "@emotion/styled";
import { Props } from "./Modal.types";
import { Text, Button, Flex } from "@/components";
import { useTheme } from "@/hooks";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.grayScale[10]};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  width: 440px;
`;

const TitleAndContentContainer = styled.div`
  margin-bottom: 66px;
`;

const ContentContainer = styled(Text)`
  margin-top: 8px;
`;

export const Modal = ({ title, content, onConfirm, onClose }: Props) => {
  const { currentTheme: theme } = useTheme();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <Backdrop onClick={onClose}>
      <ModalWrapper
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <TitleAndContentContainer>
          <Text $size="h5" $weight="bold">
            {title}
          </Text>
          <ContentContainer $size="body1" $color={theme.color.grayScale[60]}>
            {content}
          </ContentContainer>
        </TitleAndContentContainer>
        <Flex $justify="flex-end" $gap={8}>
          <Button $size="md" $variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button $size="md" $variant="contained" onClick={onConfirm}>
            확인
          </Button>
        </Flex>
      </ModalWrapper>
    </Backdrop>
  );
};
