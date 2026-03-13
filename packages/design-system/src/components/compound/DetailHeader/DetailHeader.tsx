import { Flex, Image } from "@/components/primitive";
import { Text } from "@/components/core";
import { DetailHeaderProps } from "./DetailHeader.types";

export const DetailHeader = ({
  type,
  title,
  logoUrl,
  businessNumber
}: DetailHeaderProps) => {
  if (type === "recruitment") {
    return <div>모집의뢰서 상세 헤더</div>;
  }
  return (
    <Flex $direction="row" $align="center" $gap={28} $fit>
      <Image src={logoUrl} alt={title} width={72} height={72} $radius={8} />
      <Flex $direction="column" $gap={8} $fit>
        <Text $size="h4" $weight="bold" $color="#000000">
          {title}
        </Text>
        <Text $size="body2" $weight="medium" $color="#7f7f7f">
          {businessNumber}
        </Text>
      </Flex>
    </Flex>
  );
};
