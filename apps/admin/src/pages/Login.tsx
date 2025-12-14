import { useLogin, setToken } from "@jobis/api";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  idRegex,
  Input,
  passwordRegex,
  Surface,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useState } from "react";

export const Login = () => {
  const { currentTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { success, error } = useToast();

  const validateId = (id: string) => {
    if (id.length > 30) {
      setIdError("아이디는 최대 30자까지 입력 가능합니다.");
      return true;
    }
    if (id && !idRegex.test(id)) {
      setIdError("아이디는 영문만 입력 가능합니다.");
      return true;
    }
    setIdError("");
    return false;
  };

  const validatePassword = (password: string) => {
    if (!passwordRegex.test(password)) {
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
      setToken({
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      });
      success("로그인에 성공했습니다.");
    },
    onError: status => {
      switch (status) {
        case 400:
          error("아이디가 공백일 수 없습니다.");
          break;
        case 401:
          error("비밀번호가 공백일 수 없습니다.");
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

    login({ account_id: accountId, password, platform_type: "WEB" });
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
          $bg={currentTheme.color.grayScale[10]}
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
              />
            </Flex>
            <Flex $justify="flex-start">
              <Checkbox
                label="로그인 유지"
                $labelColor={currentTheme.color.grayScale[50]}
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
