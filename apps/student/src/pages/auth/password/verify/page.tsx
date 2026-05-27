import { useSendAuthCode, useAuthCodeCheck } from "@jobis/api";
import {
  Box,
  Button,
  Flex,
  Input,
  Surface,
  Text,
  useAuthStore,
  useTheme,
  useToast
} from "@jobis/design-system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX, VERIFYCODE_REGEX } from "../../../../utils";

export const PasswordVerify = () => {
  const { currentTheme: theme } = useTheme();
  const { success, error } = useToast();
  const navigation = useNavigate();

  const setForgetPwInfo = useAuthStore(state => state.setAuthInfo);
  const setEmailVerified = useAuthStore(state => state.setVerified);

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const [emailError, setEmailError] = useState("");
  const [verifyCodeError, setVerifyCodeError] = useState("");

  const validateEmail = (email: string) => {
    if (!email || email.trim().length === 0) {
      setEmailError("이메일을 입력해주세요.");
      return true;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("이메일 형식에 맞게만 입력 가능합니다.");
      return true;
    }
    setEmailError("");
    return false;
  };

  const validateVerifyCode = (verifyCode: string) => {
    if (!verifyCode || verifyCode.trim().length === 0) {
      setVerifyCodeError("인증번호를 입력해주세요.");
      return true;
    }
    if (!(verifyCode.trim().length == 6)) {
      setVerifyCodeError("인증번호는 6자여야 합니다.");
      return true;
    }
    if (!VERIFYCODE_REGEX.test(verifyCode)) {
      setVerifyCodeError("숫자여야 합니다.");
      return true;
    }
    setVerifyCodeError("");
    return false;
  };

  const { mutate: sendAuthCode } = useSendAuthCode({
    onSuccess: () => {
      success("인증코드가 성공적으로 전송 됐습니다.");
    },
    onError: status => {
      switch (status) {
        case 400:
          error("이메일 형식에 맞게만 입력 가능합니다.");
          break;
        case 401:
          error("비밀번호가 올바르지 않습니다.");
          break;
        case 404:
          error("이메일이 올바르지 않습니다.");
          break;
        default:
          error("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  });
  const { mutate: checkAuthCode } = useAuthCodeCheck({
    onSuccess: () => {
      success("이메일 인증에 성공했습니다.");
      setEmailVerified(true);
      navigation("edit");
    },
    onError: status => {
      switch (status) {
        case 404:
          error("유저가 존재하지 않습니다.");
          break;
        case 409:
          error("이미 가입된 이메일입니다.");
          break;
        default:
          error("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  });

  const requestVerifyCode = () => {
    sendAuthCode({ email: email, auth_code_type: "PASSWORD" });
  };

  const checkVerifyCode = () => {
    checkAuthCode({ email: email, code: verifyCode });
  };

  const onSubmit = (email: string, verifyCode: string) => {
    if (validateEmail(email) || validateVerifyCode(verifyCode)) {
      return;
    }
    checkVerifyCode();
    setForgetPwInfo({ email });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit(email, verifyCode);
    }
  };

  return (
    <Flex
      $direction="column"
      $align="center"
      $justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Box width="400px">
        <Surface
          $radius="8px"
          $shadow
          $bg={theme.color.grayScale[10]}
          $padding="36px"
        >
          <Flex
            $direction="column"
            $align="center"
            $gap="28px"
            $justify="center"
            style={{ position: "relative" }}
          >
            <Flex $justify="center">
              <Text
                $size="h5"
                $weight="bold"
                $align="center"
                $color={theme.color.primary[20]}
              >
                비밀번호 변경
              </Text>
              <Flex
                $gap={8}
                $justify="flex-end"
                style={{ position: "absolute" }}
              >
                <Box
                  width={8}
                  height={8}
                  $radius={8}
                  $bg={theme.color.primary[20]}
                />
                <Box
                  width={8}
                  height={8}
                  $radius={8}
                  $bg={theme.color.grayScale[40]}
                />
              </Flex>
            </Flex>
            <Flex
              $direction="column"
              $gap="16px"
              $align="stretch"
              $justify="center"
            >
              <Flex $gap={8}>
                <Input
                  $width="246px"
                  placeholder="이메일을 입력해주세요."
                  $label="이메일"
                  value={email}
                  onChange={setEmail}
                  $errorMessage={emailError}
                  autoComplete="email"
                  onKeyDown={handleKeyDown}
                />
                <Button
                  $size="md"
                  $variant="outline"
                  onClick={requestVerifyCode}
                  title="button"
                  style={{ padding: 21, marginTop: 24 }}
                >
                  발송
                </Button>
              </Flex>
              <Input
                placeholder="인증번호를 입력해주세요"
                $label="인증번호"
                value={verifyCode}
                onChange={setVerifyCode}
                $errorMessage={verifyCodeError}
                autoComplete="off"
                onKeyDown={handleKeyDown}
              />
            </Flex>
            <Button
              $variant="contained"
              $size="lg"
              onClick={() => onSubmit(email, verifyCode)}
            >
              다음→
            </Button>
          </Flex>
        </Surface>
      </Box>
    </Flex>
  );
};
