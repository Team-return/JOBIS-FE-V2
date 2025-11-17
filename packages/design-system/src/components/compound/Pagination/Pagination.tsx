import styled from "@emotion/styled";
import type { Props } from "./Pagination.types";
import { Stack, Icon, Text } from "@/components";
import { useTheme } from "@/hooks";

const Component = styled(Stack)`
  height: 32px;
  align-items: center;
`;

const PageNumber = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.color.grayScale[20]};
  }
`;

const PAGE_UNIT = 3;

export const Pagination = ({ start = 1, end, current, onChange }: Props) => {
  const { currentTheme: theme } = useTheme();

  const currentGroupIndex = Math.floor((current - start) / PAGE_UNIT);
  const groupStartPage = start + currentGroupIndex * PAGE_UNIT;

  const pages = Array.from(
    { length: PAGE_UNIT },
    (_, i) => groupStartPage + i
  ).filter(page => page <= end && page >= start);

  const handlePrevGroup = () => {
    const prevGroupStartPage = Math.max(start, groupStartPage - PAGE_UNIT);
    onChange(prevGroupStartPage);
  };

  const handleNextGroup = () => {
    const nextGroupStartPage = groupStartPage + PAGE_UNIT;
    if (nextGroupStartPage <= end) {
      onChange(nextGroupStartPage);
    }
  };

  const canGoPrev = groupStartPage > start;
  const canGoNext = groupStartPage + PAGE_UNIT <= end;

  return (
    <Component $direction="row" $gap={16}>
      <Icon
        icon="ChevronLeft"
        size={16}
        fillColor={
          canGoPrev ? theme.color.grayScale[80] : theme.color.grayScale[50]
        }
        onClick={canGoPrev ? handlePrevGroup : undefined}
        style={{ cursor: canGoPrev ? "pointer" : "not-allowed" }}
      />
      <Stack $direction="row" $gap={8}>
        {pages.map(page => (
          <PageNumber key={page} onClick={() => onChange(page)}>
            <Text
              $size="body3"
              $align="center"
              $weight="bold"
              $color={
                current === page
                  ? theme.color.grayScale[90]
                  : theme.color.grayScale[60]
              }
            >
              {page.toString()}
            </Text>
          </PageNumber>
        ))}
      </Stack>
      <Icon
        icon="ChevronRight"
        size={16}
        fillColor={
          canGoNext ? theme.color.grayScale[80] : theme.color.grayScale[50]
        }
        onClick={canGoNext ? handleNextGroup : undefined}
        style={{ cursor: canGoNext ? "pointer" : "not-allowed" }}
      />
    </Component>
  );
};
