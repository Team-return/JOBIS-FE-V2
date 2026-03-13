import {
  Container,
  DetailHeader,
  Flex,
  Icon,
  Spacer,
  Box
} from "@jobis/design-system";

export const CompanyDetail = () => {
  return (
    <Container $maxWidth={960}>
      <Flex $direction="row" $justify="space-between" $align="center">
        <DetailHeader
          type="company"
          title="기업명"
          logoUrl="/path/to/logo.png"
          businessNumber="123-45-6789"
        />
        <Spacer $flex={1} />
        <Icon icon="KebapMenu" size={24} />
      </Flex>
      <Box width={960} />
    </Container>
  );
};
