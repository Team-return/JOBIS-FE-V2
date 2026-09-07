import { useCheckPw } from "@jobis/api";
import {
  Box,
  Button,
  Flex,
  Input,
  Surface,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChangePwVerify = () => {
  const { currentTheme: theme } = useTheme();
  const { error } = useToast();
  const navigation = useNavigate();

  const [eyeOpen, setEyeOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    if (!password || password.trim().length === 0) {
      setPasswordError("비밀번호를 입력해주세요.");
      return true;
    }
    setPasswordError("");
    return false;
  };

  const { mutate: checkPw } = useCheckPw({
    onSuccess: (_data, variables) => {
      navigation("edit", { state: { currentPassword: variables.password } });
    },
    onError: status => {
      switch (status) {
        case 400:
        case 401:
          error("비밀번호가 올바르지 않습니다.");
          break;
        case 404:
          error("계정을 찾을 수 없습니다.");
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
    checkPw({ password });
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
            <Flex $justify="center">
              <Text
                $size="h5"
                $weight="bold"
                $align="center"
                $color={theme.color.primary[20]}
              >
                비밀번호 수정
              </Text>
            </Flex>
            <Input
              placeholder="기존 비밀번호를 입력해 주세요."
              $label="비밀번호 확인"
              value={password}
              onChange={setPassword}
              $iconName={eyeOpen ? "EyeOpen" : "EyeClose"}
              onIconClick={() => setEyeOpen(!eyeOpen)}
              type={eyeOpen ? "text" : "password"}
              $errorMessage={passwordError}
              autoComplete="current-password"
              onKeyDown={handleKeyDown}
            />
            <Button
              $variant="contained"
              $size="lg"
              onClick={() => onSubmit(password)}
            >
              다음 →
            </Button>
          </Flex>
        </Surface>
      </Box>
    </Flex>
  );
};
