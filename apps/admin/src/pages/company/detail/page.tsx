import { useCompanyDetail } from "@jobis/api";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Skeleton,
  Text,
  useTheme
} from "@jobis/design-system";
import { useLoaderData, useNavigate } from "react-router-dom";
import { formatPhone } from "../edit";
import { LoaderData } from "apps/admin/src/utils/query-params";

const FILE_URL = import.meta.env.FILE_URL;

export const CompanyDetail = () => {
  const { params: id } = useLoaderData() as LoaderData<number>;
  const { currentTheme: theme } = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useCompanyDetail(id);

  const formatValue = (value: string | number | null | undefined) =>
    value === null || value === undefined ? "-" : String(value);

  const infos: Array<[string, string]> = [
    ["대표 서비스명", formatValue(data?.service_name)],
    ["대표자", formatValue(data?.representative_name)],
    ["대표번호", formatPhone(formatValue(data?.representative_phone_no))],
    ["설립일", formatValue(data?.founded_at)],
    ["담당자", formatValue(data?.manager_name)],
    ["전화번호", formatPhone(formatValue(data?.manager_phone_no))],
    ["담당자2", "-"],
    ["전화번호2", "-"],
    ["매출액", formatValue(data?.take)],
    ["근로자 수", formatValue(data?.worker_number)],
    ["사업분야", formatValue(data?.business_area)],
    ["팩스번호", "-"],
    ["본사주소", formatValue(data?.main_address)],
    ["이메일", formatValue(data?.email)],
    ["지점주소", "-"]
  ];
  return (
    <Container $padding={[68, 0, 112]} $maxWidth={1242}>
      <Flex $direction="column" $gap={48} $align="center" $justify="center">
        <Flex $direction="column" $gap={40}>
          <Flex $justify="flex-start">
            <IconButton
              icon="ArrowLeft"
              $width="131"
              onClick={() => navigate("/company")}
            >
              돌아가기
            </IconButton>
          </Flex>
          <Flex $justify="space-between" $align="center">
            {isLoading ? (
              <Flex $align="center" $gap={24} $fit>
                <Skeleton width={72} height={72} $radius={16} />
                <Skeleton width={200} height={32} />
              </Flex>
            ) : (
              <Flex $align="center" $gap={24} $fit>
                <Image
                  src={
                    data?.company_profile_url
                      ? `${FILE_URL}/${data.company_profile_url}`
                      : "/logo.svg"
                  }
                  alt="기업 아이콘"
                  width={72}
                  height={72}
                  $radius={16}
                />
                <Text $size="h4" $weight="bold">
                  {data?.company_name}
                </Text>
              </Flex>
            )}

            <Button
              $variant="outline"
              $size="sm"
              onClick={() => navigate(`/company/detail/edit/${id}`)}
            >
              수정
            </Button>
          </Flex>
        </Flex>
        <Flex $direction="column" $gap={24} $fit>
          <Flex $direction="column" $gap={17}>
            <Flex $align="center" $gap={12}>
              <Icon icon="Company" color={theme.color.primary[20]} />
              <Text
                $size="body1"
                $weight="bold"
                $color={theme.color.primary[20]}
              >
                회사소개
              </Text>
            </Flex>
            <Box width={1242} height={1} $bg={theme.color.grayScale[50]}></Box>
          </Flex>
          {isLoading ? (
            <Skeleton width={500} height={26} />
          ) : (
            <Text $size="body2">{data?.company_introduce}</Text>
          )}
        </Flex>
        <Flex $direction="column" $gap={32}>
          <Flex $direction="column" $gap={17}>
            <Flex $align="center" $gap={12}>
              <Icon icon="Speaker" color={theme.color.primary[20]} />
              <Text
                $size="body1"
                $weight="bold"
                $color={theme.color.primary[20]}
              >
                상세정보
              </Text>
            </Flex>
            <Box width="100%" height={1} $bg={theme.color.grayScale[50]}></Box>
          </Flex>
          <Grid $columns="repeat(2, 1fr)" $gap={24}>
            {infos.map(([label, value]) => (
              <Flex key={label} $gap={16}>
                <Box width={108}>
                  <Text
                    $size="body1"
                    $weight="bold"
                    $color={theme.color.grayScale[80]}
                  >
                    {label}
                  </Text>
                </Box>
                {isLoading ? (
                  <Skeleton width={62} height={26} />
                ) : (
                  <Text $size="body1" $color={theme.color.grayScale[80]}>
                    {value}
                  </Text>
                )}
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Container>
  );
};
