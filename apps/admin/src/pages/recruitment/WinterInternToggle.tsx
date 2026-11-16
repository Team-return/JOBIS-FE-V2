import {
  Flex,
  Modal,
  Switch,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useState } from "react";
import {
  query,
  useToggleWinterIntern,
  useWinterInternStatus,
  winterInternKeys
} from "@jobis/api";
import { getErrorMessage } from "../../utils";

export const WinterInternToggle = () => {
  const { currentTheme: theme } = useTheme();
  const toast = useToast();

  const { data: isWinterIntern } = useWinterInternStatus();
  const { mutate: toggleWinterIntern } = useToggleWinterIntern();

  // 서버 값을 다시 받아올 때까지 바꾸려는 값을 보여 주고 다시 누르지 못하게 막는다
  const [pendingValue, setPendingValue] = useState<boolean | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const requestToggle = (next: boolean) => {
    setPendingValue(next);
    // PATCH는 값을 받지 않고 서버 상태를 뒤집기만 한다
    toggleWinterIntern(undefined, {
      onSuccess: async () => {
        toast.success(next ? "겨울인턴을 켰습니다." : "겨울인턴을 껐습니다.");
        await query.invalidate(winterInternKeys.winterInternStatus());
        setPendingValue(null);
      },
      onError: error => {
        setPendingValue(null);
        toast.error(
          getErrorMessage(error, "겨울인턴 상태 변경에 실패했습니다.")
        );
      }
    });
  };

  const handleChange = (next: boolean) => {
    // 켜면 서버가 학생들에게 푸시를 보내므로 한 번 더 확인받는다
    if (next) {
      setIsConfirmOpen(true);
      return;
    }
    requestToggle(false);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    requestToggle(true);
  };

  return (
    <>
      <Flex $align="center" $gap={12} $fit>
        <Text $size="body2" $color={theme.color.grayScale[90]}>
          겨울인턴
        </Text>
        <Switch
          aria-label="겨울인턴"
          $checked={pendingValue ?? isWinterIntern ?? false}
          disabled={isWinterIntern === undefined || pendingValue !== null}
          onChange={handleChange}
        />
      </Flex>
      {isConfirmOpen && (
        <Modal
          title="겨울인턴을 켤까요?"
          content="켜면 알림을 구독한 학생 전원에게 겨울인턴 시즌 시작 푸시 알림이 전송됩니다."
          onConfirm={handleConfirm}
          onClose={() => setIsConfirmOpen(false)}
        />
      )}
    </>
  );
};
