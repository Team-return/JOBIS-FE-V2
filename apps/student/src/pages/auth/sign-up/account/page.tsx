import {
  useSendAuthCode,
  useAuthCodeCheck
} from "@jobis/api";
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
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  VERIFYCODE_REGEX
} from "../../../../utils";

export const SignUp = () => {
  const { currentTheme: theme } = useTheme();
  const { success, error } = useToast();
  const navigation = useNavigate();

  const setSignupInfo = useAuthStore((state) => state.setAuthInfo);
  const setEmailVerified = useAuthStore((state) => state.setVerified);

  const [eyeOpen, setEyeOpen] = useState(false);
  const [cfEyeOpen, setCfEyeOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [verifyCodeError, setVerifyCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwConfirmError, setPwConfirmError] = useState("");

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

  const validatePassword = (password: string) => {
    if (!password || password.trim().length === 0) {
      setPasswordError("비밀번호를 입력해주세요.");
      return true;
    }
    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError(
        "비밀번호는 영문, 숫자, 특수문자를 포함하여 8-16자여야 합니다."
      );
      return true;
    }
    setPasswordError("");
    return false;
  };

  const validatePwConfirm = (pwConfirm: string) => {
    if (!pwConfirm || pwConfirm.trim().length === 0) {
      setPwConfirmError("비밀번호를 입력해주세요.");
      return true;
    }
    if (!(pwConfirm == password)) {
      setPwConfirmError("비밀번호가 일치 되어야 합니다.");
      return true;
    }
    setPwConfirmError("");
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
        case 409:
          error("이미 가입된 이메일입니다.");
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
    },
    onError: status => {
      switch (status) {
        case 401:
          error("인증번호가 다릅니다.");
          break;
        case 404:
          error("해당 메일로 발송된 인증코드가 존재하지 않습니다.");
          break;
        default:
          error("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  });

  const requestVerifyCode = () => {
    sendAuthCode({ email: email, auth_code_type: "SIGN_UP" });
  };

  const checkVerifyCode = () => {
    checkAuthCode({ email: email, code: verifyCode });
  };

  const onSubmit = (
    email: string,
    verifyCode: string,
    password: string,
    pwConfirm: string
  ) => {
    if (
      validateEmail(email) ||
      validateVerifyCode(verifyCode) ||
      validatePassword(password) ||
      validatePwConfirm(pwConfirm)
    ) {
      return;
    }
    setSignupInfo({ email, password });
    navigation("step2")
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit(email, verifyCode, password, pwConfirm);
    }
  };

  const handleClick = () => {
    navigation("/login");
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
                회원가입
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
              <Flex $gap={8}>
                <Input
                  $width="246px"
                  placeholder="인증번호를 입력해주세요"
                  $label="인증번호"
                  value={verifyCode}
                  onChange={setVerifyCode}
                  $errorMessage={verifyCodeError}
                  autoComplete="off"
                  onKeyDown={handleKeyDown}
                />
                <Button
                  $size="md"
                  $variant="outline"
                  onClick={checkVerifyCode}
                  title="button"
                  style={{ padding: 21, marginTop: 24 }}
                >
                  인증
                </Button>
              </Flex>
              <Input
                placeholder="비밀번호를 입력해주세요."
                $label="비밀번호"
                value={password}
                onChange={setPassword}
                $iconName={eyeOpen ? "EyeOpen" : "EyeClose"}
                onIconClick={() => setEyeOpen(!eyeOpen)}
                type={eyeOpen ? "text" : "password"}
                $errorMessage={passwordError}
                autoComplete="new-password"
                onKeyDown={handleKeyDown}
              />
              <Input
                placeholder="비밀번호를 한번 더 입력해주세요."
                $label="비밀번호 확인"
                value={pwConfirm}
                onChange={setPwConfirm}
                $iconName={cfEyeOpen ? "EyeOpen" : "EyeClose"}
                onIconClick={() => setCfEyeOpen(!cfEyeOpen)}
                type={cfEyeOpen ? "text" : "password"}
                $errorMessage={pwConfirmError}
                autoComplete="new-password"
                onKeyDown={handleKeyDown}
              />
            </Flex>
            <Button
              $variant="contained"
              $size="lg"
              onClick={() => onSubmit(email, verifyCode, password, pwConfirm)}
            >
              다음으로
            </Button>
            <Flex $justify="center" $gap={4}>
              <Text
                $size="caption"
                $align="left"
                $weight="regular"
                $color={theme.color.grayScale[90]}
              >
                이미 계정이 있으신가요?
              </Text>
              <button
                style={{
                  border: 0,
                  backgroundColor: "white",
                  padding: 0,
                  cursor: "pointer"
                }}
                onClick={handleClick}
              >
                <Text
                  $size="caption"
                  $align="right"
                  $weight="regular"
                  $underline
                  $color={theme.color.subColor.blue[30]}
                >
                  로그인
                </Text>
              </button>
            </Flex>
          </Flex>
        </Surface>
      </Box>
    </Flex>
  );
};
