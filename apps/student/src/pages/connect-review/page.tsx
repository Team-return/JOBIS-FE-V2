import { Box, Container, Text, Flex, Button } from "@jobis/design-system";

export const ConnectReviewPage = () => {
  return (
    <Container $maxWidth={960}>
      <Box height={123} />
      <Flex $direction="column" $gap={50}>
        <Flex $direction="column" $align="center" $gap={16}>
          <Text $size="h4" $weight="bold">
            수고하셨습니다!
          </Text>
          <Flex $direction="column" $align="center" $gap={8}>
            <Text $size="h6" $weight="medium" $color="#7F7F7F">
              토스(회사이름)에서 본 면접 후기를 작성해주세요!
            </Text>
            <Text $size="h6" $weight="medium" $color="#7F7F7F">
              더 많은 학생들이 참고해서 성장 할 수 있습니다!
            </Text>
          </Flex>
        </Flex>
        <Box width={960}>
          <Button $variant="outline" $size="lg" $padding={[32, 779, 34, 32]}>
            면접 후기 작성하기
          </Button>
        </Box>
      </Flex>
      <Box height={513} />
    </Container>
  );
};
