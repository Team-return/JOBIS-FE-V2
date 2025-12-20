import { ErrorBoundary } from "@sentry/react";
import type { ReactNode, ReactElement } from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface FallbackProps {
  error: unknown;
  componentStack: string;
  resetError: () => void;
}

interface ErrorInfo {
  timestamp: string;
  userAgent: string;
  url: string;
}

const IS_DEVELOPMENT = import.meta.env.MODE === "development";

const collectErrorInfo = (): ErrorInfo => ({
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  url: window.location.href
});

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Container = styled.div`
  max-width: 480px;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 24px;
  animation: ${fadeIn} 0.3s ease-out 0.1s both;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  background: #fef2f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ErrorIcon = styled.svg`
  width: 24px;
  height: 24px;
  color: #dc2626;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const Button = styled.button<{
  variant?: "primary" | "secondary";
  disabled?: boolean;
}>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${props =>
    props.variant === "primary"
      ? `
    background: #2563eb;
    color: white;
    
    &:hover:not(:disabled) {
      background: #1d4ed8;
    }
    
    &:disabled {
      background: #93c5fd;
    }
  `
      : `
    background: #4b5563;
    color: white;
    
    &:hover:not(:disabled) {
      background: #374151;
    }
  `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: ${spin} 1s linear infinite;
`;

const Divider = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
`;

const DetailsToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #6b7280;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #111827;
  }
`;

const ChevronIcon = styled.svg<{ isOpen: boolean }>`
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DetailsContent = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailSection = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
`;

const DetailTitle = styled.div`
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  font-size: 13px;
`;

const DetailContent = styled.pre`
  white-space: pre-wrap;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
  color: #6b7280;
  max-height: 120px;
  overflow-y: auto;

  &.error {
    color: #dc2626;
  }
`;

const EnvInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
`;

const EnvItem = styled.div`
  display: flex;
  gap: 8px;

  strong {
    min-width: 80px;
    color: #374151;
  }
`;

const CopyButton = styled.button`
  width: 100%;
  background: #f3f4f6;
  color: #374151;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #e5e7eb;
  }
`;

const Footer = styled.div`
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 16px;
`;

const ErrorBoundaryFallback = ({
  error,
  componentStack,
  resetError
}: FallbackProps) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showDetails, setShowDetails] = useState(IS_DEVELOPMENT);
  const [errorInfo] = useState(collectErrorInfo);

  const handleRetry = async () => {
    setIsRetrying(true);

    setTimeout(() => {
      resetError();
      setIsRetrying(false);
    }, 500);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const copyErrorToClipboard = async () => {
    const errorText = `
Error: ${error instanceof Error ? error.message : String(error)}
Stack: ${error instanceof Error ? error.stack : "No stack trace"}
Component Stack: ${componentStack}
Timestamp: ${errorInfo.timestamp}
URL: ${errorInfo.url}
User Agent: ${errorInfo.userAgent}
    `.trim();

    try {
      await navigator.clipboard.writeText(errorText);
      alert("에러 정보가 클립보드에 복사되었습니다.");
    } catch {
      console.error("클립보드 복사 실패");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetError();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetError]);

  return (
    <Overlay role="alert" aria-live="assertive">
      <Container>
        <Header>
          <IconContainer>
            <ErrorIcon fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </ErrorIcon>
          </IconContainer>
          <HeaderContent>
            <Title>오류가 발생했습니다</Title>
            <Subtitle>잠시 후 다시 시도해주세요</Subtitle>
          </HeaderContent>
        </Header>

        <ButtonGroup>
          <Button variant="primary" onClick={handleRetry} disabled={isRetrying}>
            {isRetrying ? (
              <>
                <LoadingSpinner />
                재시도 중...
              </>
            ) : (
              "다시 시도"
            )}
          </Button>

          <Button variant="secondary" onClick={handleReload}>
            페이지 새로고침
          </Button>
        </ButtonGroup>

        <Divider>
          <DetailsToggle onClick={() => setShowDetails(!showDetails)}>
            <span>에러 상세정보</span>
            <ChevronIcon
              isOpen={showDetails}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </ChevronIcon>
          </DetailsToggle>

          {showDetails && (
            <DetailsContent>
              <DetailSection>
                <DetailTitle>오류 메시지:</DetailTitle>
                <DetailContent className="error">
                  {error instanceof Error ? error.message : String(error)}
                </DetailContent>
              </DetailSection>

              {error instanceof Error && error.stack && (
                <DetailSection>
                  <DetailTitle>스택 트레이스:</DetailTitle>
                  <DetailContent>{error.stack}</DetailContent>
                </DetailSection>
              )}

              {componentStack && (
                <DetailSection>
                  <DetailTitle>컴포넌트 스택:</DetailTitle>
                  <DetailContent>{componentStack}</DetailContent>
                </DetailSection>
              )}

              <DetailSection>
                <DetailTitle>환경 정보:</DetailTitle>
                <EnvInfo>
                  <EnvItem>
                    <strong>시간:</strong>
                    <span>{errorInfo.timestamp}</span>
                  </EnvItem>
                  <EnvItem>
                    <strong>URL:</strong>
                    <span>{errorInfo.url}</span>
                  </EnvItem>
                </EnvInfo>
              </DetailSection>

              <CopyButton onClick={copyErrorToClipboard}>
                에러 정보 복사
              </CopyButton>
            </DetailsContent>
          )}
        </Divider>

        <Footer>ESC 키를 눌러 닫을 수 있습니다</Footer>
      </Container>
    </Overlay>
  );
};

interface SentryErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactElement;
  level?: "page" | "section" | "component";
  identifier?: string;
}

export const SentryErrorBoundary = ({
  children,
  fallback,
  level = "component",
  identifier
}: SentryErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallback={fallback || ErrorBoundaryFallback}
      beforeCapture={(scope, _, componentStack) => {
        scope.setTag("errorBoundary.level", level);
        if (identifier) {
          scope.setTag("errorBoundary.identifier", identifier);
        }
        scope.setContext("errorBoundary", {
          level,
          identifier,
          componentStack,
          timestamp: new Date().toISOString()
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
