import { Gender, useStudentSignup } from "@jobis/api";
import {
  Box,
  Button,
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
import {
  GRADE_REGEX,
} from "../../../../utils";

const STORAGE_KEYS = {
  EMAIL: "signup_email",
  VERIFY_CODE: "signup_verify_code",
  PASSWORD: "signup_password",
  PWCONFIRM: "signup_pw_confirm"
} as const;

export const SignUpProfile = () => {
  const { currentTheme: theme } = useTheme();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState<Gender>("MAN");
  const [nameError, setNameError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [genderError, setGenderError] = useState("");

  const { success, error } = useToast();
  const navigation = useNavigate();

  const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.EMAIL);
    localStorage.removeItem(STORAGE_KEYS.VERIFY_CODE);
    localStorage.removeItem(STORAGE_KEYS.PASSWORD);
  };

  const validateName = (name: string) => {
    if (!name || name.trim().length === 0) {
      setNameError("이름을 입력해주세요.");
      return true;
    }
    setNameError("");
    return false;
  };

  const validateGrade = (grade: string) => {
    if (!grade || grade.trim().length === 0) {
      setGradeError("비밀번호를 입력해주세요.");
      return true;
    }
    if (!GRADE_REGEX.test(grade)) {
      setGradeError("학번 형식에 맞게만 입력 가능합니다.");
      return true;
    }
    setGradeError("");
    return false;
  };

  const validateGender = (gender: Gender) => {
    if (!gender || gender.trim().length === 0) {
      setGenderError("성별을 선택해주세요.");
      return true;
    }
    if (!(gender == "MAN" || gender == "WOMAN")) {
      setGenderError("비밀번호가 일치 되어야 합니다.");
      return true;
    }
    setGenderError("");
    return false;
  };

  const parseGrade = (value: string) => {
    const match = value.match(/^([1-3])([1-4])(0[1-9]|1[0-9])$/);
    if (!match) return null;

    return {
      grade: Number(match[1]),
      class: Number(match[2]),
      number: Number(match[3])
    };
  };

  const { mutate: signup } = useStudentSignup({
    onSuccess: () => {
      success("회원가입에 성공했습니다.");
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

  const onSubmit = (name: string, grade: string, gender: Gender) => {
    if (validateName(name) || validateGrade(grade) || validateGender(gender)) {
      return;
    }

    console.log({
      email: localStorage.getItem(STORAGE_KEYS.EMAIL),
      password: localStorage.getItem(STORAGE_KEYS.PASSWORD),
      grade: Number(parseGrade(grade)?.grade),
      name: name,
      gender: gender,
      class_room: Number(parseGrade(grade)?.class),
      number: Number(parseGrade(grade)?.number),
      platform_type: "WEB"
    });

    signup({
      email: localStorage.getItem(STORAGE_KEYS.EMAIL)!,
      password: localStorage.getItem(STORAGE_KEYS.PASSWORD)!,
      grade: Number(parseGrade(grade)?.grade),
      name: name,
      gender: gender,
      class_room: Number(parseGrade(grade)?.class),
      number: Number(parseGrade(grade)?.number),
      platform_type: "WEB"
    });
    clearLocalStorage();
    navigation("/login");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit(name, grade, gender);
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
                placeholder="이름을 입력해주세요."
                $label="이름"
                value={name}
                onChange={setName}
                $errorMessage={nameError}
                onKeyDown={handleKeyDown}
              />
              <Input
                placeholder="학번을 입력해주세요."
                $label="학번"
                value={grade}
                onChange={setGrade}
                $errorMessage={gradeError}
                onKeyDown={handleKeyDown}
              />
              <Text $size="body3">성별</Text>
              <Flex $gap={8}>
                <Flex $gap={8}>
                  <Button
                    $variant={gender === "MAN" ? "contained" : "outline"}
                    $size="md"
                    onClick={() => setGender("MAN")}
                    style={{ flex: 1 }}
                  >
                    남자
                  </Button>
                  <Button
                    $variant={gender === "WOMAN" ? "contained" : "outline"}
                    $size="md"
                    onClick={() => setGender("WOMAN")}
                    style={{ flex: 1 }}
                  >
                    여자
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex style={{ position: "relative", display: "inline-block" }}>
              <Button
                $variant="contained"
                $size="lg"
                onClick={() => onSubmit(name, grade, gender)}
              >
                완료
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
