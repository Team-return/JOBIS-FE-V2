import { useChangePwByEmail } from "@jobis/api";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Surface,
  Text,
  useAuthStore,
  useTheme,
  useToast
} from "@jobis/design-system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PASSWORD_REGEX } from "../../../../utils";

export const PasswordEdit = () => {
  const { currentTheme: theme } = useTheme();
  const { success, error } = useToast();
  const navigation = useNavigate();

  const { email, isVerified, reset } = useAuthStore();

  const [eyeOpen, setEyeOpen] = useState(false);
  const [cfEyeOpen, setCfEyeOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwConfirmError, setPwConfirmError] = useState("");

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

  const { mutate: ChangePw } = useChangePwByEmail({
    onSuccess: () => {
      success("비밀번호가 변경되었습니다.");
      reset();
      navigation("/login");
    },
    onError: status => {
      switch (status) {
        case 400:
          error("아이디가 공백일 수 없습니다.");
          break;
        case 401:
          error("이메일 인증이 필요합니다.");
          break;
        case 404:
          error("계정을 찾을 수 없습니다.");
          break;
        default:
          error("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  });

  const onSubmit = (password: string, pwConfirm: string) => {
    if (validatePassword(password) || validatePwConfirm(pwConfirm)) {
      return;
    }
    if (!isVerified) {
      error("이메일 인증이 필요합니다.");
      navigation("/forget-pw");
      return;
    }
    ChangePw({ email, password });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit(password, pwConfirm);
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
            $align="stretch"
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
                  $bg={theme.color.grayScale[40]}
                />
                <Box
                  width={8}
                  height={8}
                  $radius={8}
                  $bg={theme.color.primary[20]}
                />
              </Flex>
            </Flex>
            <Flex
              $direction="column"
              $gap="16px"
              $align="stretch"
              $justify="center"
            >
              <Input
                placeholder="새로운 비밀번호를 입력해주세요."
                $label="비밀번호"
                value={password}
                onChange={setPassword}
                $iconName={eyeOpen ? "EyeOpen" : "EyeClose"}
                onIconClick={() => setEyeOpen(!eyeOpen)}
                type={eyeOpen ? "text" : "password"}
                $errorMessage={passwordError}
                autoComplete="current-password"
                onKeyDown={handleKeyDown}
              />
              <Input
                placeholder="비밀번호를 한번 더 입력해주세요."
                $label="비밀번호"
                value={pwConfirm}
                onChange={setPwConfirm}
                $iconName={cfEyeOpen ? "EyeOpen" : "EyeClose"}
                onIconClick={() => setCfEyeOpen(!cfEyeOpen)}
                type={cfEyeOpen ? "text" : "password"}
                $errorMessage={pwConfirmError}
                autoComplete="current-password"
                onKeyDown={handleKeyDown}
              />
            </Flex>
            <Flex style={{ position: "relative", display: "inline-block" }}>
              <Button
                $variant="contained"
                $size="lg"
                onClick={() => onSubmit(password, pwConfirm)}
              >
                확인
              </Button>
              <Icon
                icon="ArrowRight"
                fillColor={theme.color.grayScale[10]}
                size={24}
                role="img"
                style={{
                  position: "absolute",
                  left: "54%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none"
                }}
              />
            </Flex>
          </Flex>
        </Surface>
      </Box>
    </Flex>
  );
};
