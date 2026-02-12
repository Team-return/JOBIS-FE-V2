import {
  companiesKeys,
  query,
  useCompanyDetail,
  useUpdateCompany
} from "@jobis/api";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Input,
  Skeleton,
  Text,
  TextArea,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { Address } from "react-daum-postcode";
import {
  DATE_REGEX,
  EMAIL_REGEX,
  NUMBER_REGEX,
  PHONE_REGEX
} from "../../../utils";

interface FormState {
  serviceName: string;
  representativeName: string;
  representativePhoneNo: string;
  foundedAt: string;
  managerName: string;
  managerPhoneNo: string;
  managerName2: string;
  managerPhoneNo2: string;
  take: string;
  workerNumber: string;
  businessArea: string;
  fax: string;
  mainAddress: string;
  mainZipCode: string;
  email: string;
  branchAddress: string;
  branchZipCode: string;
  companyIntroduce: string;
}

type Action =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "SET_ALL"; value: FormState };

type FormErrors = Partial<Record<keyof FormState, string>>;

type ErrorAction =
  | { type: "SET_ERROR"; field: keyof FormState; message: string }
  | { type: "RESET_ERRORS" };

const FILE_URL = import.meta.env.FILE_URL;

const InitialFormState: FormState = {
  serviceName: "",
  representativeName: "",
  representativePhoneNo: "",
  foundedAt: "",
  managerName: "",
  managerPhoneNo: "",
  managerName2: "",
  managerPhoneNo2: "",
  take: "",
  workerNumber: "",
  businessArea: "",
  fax: "",
  mainAddress: "",
  mainZipCode: "",
  email: "",
  branchAddress: "",
  branchZipCode: "",
  companyIntroduce: ""
};

const InfoFields: Array<{ label: string; key: keyof FormState }> = [
  { label: "대표 서비스명", key: "serviceName" },
  { label: "대표자", key: "representativeName" },
  { label: "대표번호", key: "representativePhoneNo" },
  { label: "설립일", key: "foundedAt" },
  { label: "담당자", key: "managerName" },
  { label: "전화번호", key: "managerPhoneNo" },
  { label: "담당자2", key: "managerName2" },
  { label: "전화번호2", key: "managerPhoneNo2" },
  { label: "매출액", key: "take" },
  { label: "근로자 수", key: "workerNumber" },
  { label: "사업분야", key: "businessArea" },
  { label: "팩스번호", key: "fax" },
  { label: "본사주소", key: "mainAddress" },
  { label: "이메일", key: "email" },
  { label: "지점주소", key: "branchAddress" },
  { label: "회사소개", key: "companyIntroduce" }
];

const PhoneFields: Array<keyof FormState> = [
  "representativePhoneNo",
  "managerPhoneNo",
  "managerPhoneNo2",
  "fax"
];

const NumberFields: Array<keyof FormState> = ["take", "workerNumber"];
const DateFields: Array<keyof FormState> = ["foundedAt"];
const EmailFields: Array<keyof FormState> = ["email"];

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("02")) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    }
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

export const CompanyEdit = () => {
  const toast = useToast();
  const { currentTheme: theme } = useTheme();
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useCompanyDetail(Number(companyId));
  const { mutate: updateCompany } = useUpdateCompany(
    companyId ? Number(companyId) : 0
  );
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [addressField, setAddressField] = useState<
    "mainAddress" | "branchAddress"
  >("mainAddress");

  const reducer = (state: FormState, action: Action): FormState => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "SET_ALL":
        return action.value;
      default:
        return state;
    }
  };

  const errorReducer = (state: FormErrors, action: ErrorAction): FormErrors => {
    switch (action.type) {
      case "SET_ERROR":
        return { ...state, [action.field]: action.message };
      case "RESET_ERRORS":
        return {};
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(reducer, InitialFormState);
  const [formErrors, dispatchError] = useReducer(errorReducer, {});

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 4) return digits;
    if (digits.length <= 6) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  };

  const formatNumber = (value: string) => value.replace(/\D/g, "");

  const formatEmail = (value: string) =>
    value.replace(/[^A-Za-z0-9@._+-]/g, "");

  const formatInputValue = (value: string | number | null | undefined) =>
    value === null || value === undefined ? "" : String(value);

  useEffect(() => {
    if (!data) return;
    dispatchError({ type: "RESET_ERRORS" });
    dispatch({
      type: "SET_ALL",
      value: {
        serviceName: formatInputValue(data.service_name),
        representativeName: formatInputValue(data.representative_name),
        representativePhoneNo: formatPhone(data.representative_phone_no),
        foundedAt: formatInputValue(data.founded_at),
        managerName: formatInputValue(data.manager_name),
        managerPhoneNo: formatPhone(data.manager_phone_no),
        managerName2: "",
        managerPhoneNo2: "",
        take: formatInputValue(data.take),
        workerNumber: formatInputValue(data.worker_number),
        businessArea: formatInputValue(data.business_area),
        fax: "",
        mainAddress: formatInputValue(data.main_address),
        mainZipCode: formatInputValue(data.main_zip_code),
        email: formatInputValue(data.email),
        branchAddress: "",
        branchZipCode: "",
        companyIntroduce: formatInputValue(data.company_introduce)
      }
    });
  }, [data]);

  const validateField = (field: keyof FormState, value: string): string => {
    if (!value) return "";

    switch (field) {
      case "representativePhoneNo":
      case "managerPhoneNo":
      case "managerPhoneNo2":
      case "fax":
        return PHONE_REGEX.test(value)
          ? ""
          : "전화번호 형식이 올바르지 않습니다.";
      case "email":
        return EMAIL_REGEX.test(value)
          ? ""
          : "이메일 형식이 올바르지 않습니다.";
      case "foundedAt":
        return DATE_REGEX.test(value) ? "" : "날짜 형식이 올바르지 않습니다.";
      case "take":
      case "workerNumber":
        return NUMBER_REGEX.test(value) ? "" : "숫자만 입력해주세요.";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof FormState) => (value: string) => {
    let nextValue = value;

    if (PhoneFields.includes(field)) {
      nextValue = formatPhone(value);
    } else if (DateFields.includes(field)) {
      nextValue = formatDate(value);
    } else if (NumberFields.includes(field)) {
      nextValue = formatNumber(value);
    } else if (EmailFields.includes(field)) {
      nextValue = formatEmail(value);
    }

    dispatch({ type: "SET_FIELD", field, value: nextValue });
    const message = validateField(field, nextValue);
    dispatchError({ type: "SET_ERROR", field, message });
  };

  const openPostcode = (field: "mainAddress" | "branchAddress") => {
    setAddressField(field);
    setIsPostcodeOpen(true);
  };

  const handleCompleteAddress = (address: Address) => {
    const roadAddress = address.roadAddress || address.address;
    const zipCode = address.zonecode;

    dispatch({ type: "SET_FIELD", field: addressField, value: roadAddress });
    dispatch({
      type: "SET_FIELD",
      field: addressField === "mainAddress" ? "mainZipCode" : "branchZipCode",
      value: zipCode
    });
    setIsPostcodeOpen(false);
  };

  const closePostcode = () => setIsPostcodeOpen(false);

  const invalidateCompanyQueries = async () => {
    await Promise.all([
      query.invalidate(companiesKeys.companyDetail(Number(companyId)))
    ]);
  };

  const handleUpdateCompany = () => {
    const updateData = {
      service_name: formState.serviceName,
      representative_phone_no: formatNumber(formState.representativePhoneNo),
      manager_name: formState.managerName,
      manager_phone_no: formatNumber(formState.managerPhoneNo),
      take: Number(formState.take),
      worker_number: Number(formState.workerNumber),
      email: formState.email,
      main_address: formState.mainAddress,
      main_zip_code: formState.mainZipCode,
      company_introduce: formState.companyIntroduce,
      company_profile_url: data?.company_profile_url,
      headquarter: data?.headquarter,
      main_address_detail: data?.main_address_detail
    };
    updateCompany(updateData, {
      onSuccess: async () => {
        toast.success("회사가 성공적으로 수정되었습니다.");
        await invalidateCompanyQueries();
        navigate(`/company/detail/${companyId}`);
      },
      onError: () => {
        toast.error("회사를 수정하는 중에 오류가 발생했습니다.");
      }
    });
  };

  return (
    <Container $padding={[68, 0, 112]} $maxWidth={1242}>
      <Flex $direction="column" $gap={48} $align="center" $justify="center">
        <Flex $direction="column" $gap={40}>
          <Flex $justify="flex-start">
            <IconButton
              icon="ArrowLeft"
              $width="131"
              onClick={() => navigate(-1)}
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

            <Button $variant="outline" $size="sm" onClick={handleUpdateCompany}>
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
            <Skeleton width={1242} height={126} $radius={8} />
          ) : (
            <TextArea
              value={formState["companyIntroduce"]}
              onChange={handleChange("companyIntroduce")}
            />
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
            {InfoFields.filter(({ key }) => key !== "companyIntroduce").map(
              ({ label, key }) => (
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
                    key === "mainAddress" || key === "branchAddress" ? (
                      <Flex $direction="column" $gap={8} $fit>
                        <Flex $align="center" $gap={16}>
                          <Skeleton width={183} height={48} $radius={8} />
                          <Skeleton width={81} height={36} $radius={8} />
                        </Flex>
                        <Skeleton width={280} height={48} $radius={8} />
                      </Flex>
                    ) : (
                      <Skeleton width={280} height={48} $radius={8} />
                    )
                  ) : key === "mainAddress" || key === "branchAddress" ? (
                    <Flex $direction="column" $gap={8} $fit>
                      <Flex $align="center" $gap={16}>
                        <Input
                          $width={183}
                          value={
                            key === "mainAddress"
                              ? formState.mainZipCode
                              : formState.branchZipCode
                          }
                          onChange={handleChange(
                            key === "mainAddress"
                              ? "mainZipCode"
                              : "branchZipCode"
                          )}
                          disabled
                        />
                        <Button
                          $size="sm"
                          $variant="outline"
                          onClick={() =>
                            openPostcode(
                              key === "mainAddress"
                                ? "mainAddress"
                                : "branchAddress"
                            )
                          }
                        >
                          주소검색
                        </Button>
                      </Flex>
                      <Input
                        $width={280}
                        value={formState[key]}
                        onChange={handleChange(key)}
                        disabled
                      />
                    </Flex>
                  ) : (
                    <Input
                      value={formState[key]}
                      onChange={handleChange(key)}
                      $width={280}
                      $errorMessage={formErrors[key]}
                    />
                  )}
                </Flex>
              )
            )}
          </Grid>
        </Flex>
      </Flex>
      {isPostcodeOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={closePostcode}
        >
          <div
            style={{ width: 520, height: 560, backgroundColor: "#fff" }}
            onClick={e => e.stopPropagation()}
          >
            <DaumPostcode onComplete={handleCompleteAddress} />
          </div>
        </div>
      )}
    </Container>
  );
};
