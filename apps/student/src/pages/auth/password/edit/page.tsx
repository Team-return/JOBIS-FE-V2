import {
  useLogin,
  setToken,
  setCookie,
  removeCookie,
  getCookie,
  useCheckPw
} from "@jobis/api";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Surface,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PASSWORD_REGEX } from "../../../../utils";

export const PasswordEdit = () => {
  const { currentTheme: theme } = useTheme();
  const [eyeOpen, setEyeOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { success, error } = useToast();
  const navigation = useNavigate();

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

  const { mutate: CheckPw } = useCheckPw({
    onSuccess: () => {
      navigation("/");
    },
    onError: status => {
      switch (status) {
        case 400:
          error("아이디가 공백일 수 없습니다.");
          break;
        case 401:
          error("비밀번호가 올바르지 않습니다.");
          break;
        case 404:
          error("아이디가 올바르지 않습니다.");
          break;
        default:
          error("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  });

  const onSubmit = (password: string) => {
    if (validatePassword(password)) {
      return;
    }
    CheckPw({ password });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit(password);
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
          >
            <Text
              $size="h5"
              $weight="bold"
              $align="center"
              $color={theme.color.primary[20]}
            >
              비밀번호 수정
            </Text>
            <Flex
              $direction="column"
              $gap="16px"
              $align="stretch"
              $justify="center"
            >
              <Input
                placeholder="비밀번호를 입력해주세요."
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
            </Flex>
            <Flex style={{ position: "relative", display: "inline-block" }}>
              <Button
                $variant="contained"
                $size="lg"
                onClick={() => onSubmit(password)}
              >
                다음
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
