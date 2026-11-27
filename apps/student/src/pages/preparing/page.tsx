import { Container, Flex, Text, useTheme } from "@jobis/design-system";

/** 아직 화면이 없는 메뉴에 들어왔을 때 빈 화면 대신 보여 준다 */
export const PreparingPage = () => {
  const { currentTheme: theme } = useTheme();

  return (
    <Container $maxWidth={960} $padding={[160, 0, 232, 0]}>
      <Flex $direction="column" $align="center" $gap={12}>
        <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
          준비 중인 기능입니다.
        </Text>
        <Text $size="h6" $weight="regular" $color={theme.color.grayScale[60]}>
          조금만 기다려 주세요.
        </Text>
      </Flex>
    </Container>
  );
};
