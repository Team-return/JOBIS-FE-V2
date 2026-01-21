import {
  useLogin,
  setToken,
  setCookie,
  removeCookie,
  getCookie
} from "@jobis/api";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Surface,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ID_KEY, ID_REGEX, PASSWORD_REGEX } from "../utils";

export const Login = () => {
  const { currentTheme: theme } = useTheme();
  const [checked, setChecked] = useState(!!getCookie(ADMIN_ID_KEY));
  const [id, setId] = useState(getCookie(ADMIN_ID_KEY));
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { success, error } = useToast();
  const navigation = useNavigate();

  const validateId = (id: string) => {
    if (!id || id.trim().length === 0) {
      setIdError("아이디를 입력해주세요.");
      return true;
    }
    if (id.length > 30) {
      setIdError("아이디는 최대 30자까지 입력 가능합니다.");
      return true;
    }
    if (!ID_REGEX.test(id)) {
      setIdError("아이디는 영문만 입력 가능합니다.");
      return true;
    }
    setIdError("");
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

  const { mutate: login } = useLogin({
    onSuccess: data => {
      if (checked) setCookie(ADMIN_ID_KEY, id);
      setToken(data);
      success("로그인에 성공했습니다.");
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

  const onSubmit = (accountId: string, password: string) => {
    if (validateId(accountId) || validatePassword(password)) {
      return;
    }

    if (!checked) removeCookie(ADMIN_ID_KEY);
    login({ account_id: accountId, password, platform_type: "WEB" });
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit(id, password);
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
            <Text $size="h5" $weight="bold" $align="center">
              선생님 로그인
            </Text>
            <Flex
              $direction="column"
              $gap="16px"
              $align="stretch"
              $justify="center"
            >
              <Input
                placeholder="아이디를 입력해주세요."
                $label="아이디"
                value={id}
                onChange={setId}
                $errorMessage={idError}
                onKeyDown={handleKeyDown}
              />
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
            <Flex $justify="flex-start">
              <Checkbox
                label="아이디 저장"
                $labelColor={theme.color.grayScale[50]}
                $labelSize="body2"
                $checked={checked}
                onChange={setChecked}
              />
            </Flex>
            <Button
              $variant="contained"
              $size="md"
              onClick={() => onSubmit(id, password)}
            >
              로그인
            </Button>
          </Flex>
        </Surface>
      </Box>
    </Flex>
  );
};
