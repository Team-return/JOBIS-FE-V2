import {
  DateField,
  Flex,
  Icon,
  Modal,
  Text,
  useTheme,
  useToast
} from "@jobis/design-system";
import { useState } from "react";
import { useUpdateTrainDate } from "@jobis/api";
import { getErrorMessage } from "../../utils";
import { getTargetLabel } from "./targetLabel";

interface Props {
  applicationIds: number[];
  studentNames: string[];
  onSuccess: () => void | Promise<void>;
  onClose: () => void;
}

// 서버는 날짜를 yyyy-MM-dd로 받는다
const toRequestDate = (date: Date) =>
  [
    date.getFullYear(),
    `0${date.getMonth() + 1}`.slice(-2),
    `0${date.getDate()}`.slice(-2)
  ].join("-");

const isAfterToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() > today.getTime();
};

export const TrainDateModal = ({
  applicationIds,
  studentNames,
  onSuccess,
  onClose
}: Props) => {
  const { currentTheme: theme } = useTheme();
  const toast = useToast();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const { mutate: updateTrainDate, isPending } = useUpdateTrainDate();

  // 요청 중에 닫으면 완료 처리(안내·목록 갱신·선택 해제)가 실행되지 않으므로 막는다
  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const validate = () => {
    if (!startDate || !endDate) {
      return "파견일자와 종료일자를 모두 입력해주세요.";
    }
    // 서버가 파견일자는 오늘 이후만 받는다
    if (!isAfterToday(startDate)) return "파견일자는 오늘 이후로 입력해주세요.";
    if (endDate.getTime() < startDate.getTime()) {
      return "종료일자는 파견일자 이후로 입력해주세요.";
    }
    return "";
  };

  const handleConfirm = () => {
    if (isPending) return;

    const nextError = validate();
    setError(nextError);
    if (nextError || !startDate || !endDate) return;

    updateTrainDate(
      {
        application_ids: applicationIds,
        start_date: toRequestDate(startDate),
        end_date: toRequestDate(endDate)
      },
      {
        onSuccess: async () => {
          toast.success("파견/종료일자가 변경되었습니다.");
          await onSuccess();
          onClose();
        },
        onError: status => {
          toast.error(
            getErrorMessage(status, "파견/종료일자 변경에 실패했습니다.", {
              400: "현장실습 상태가 아닌 지원서가 포함돼 있습니다."
            })
          );
        }
      }
    );
  };

  return (
    <Modal
      title="파견/종료일자 변경"
      content={`${getTargetLabel(studentNames)} 파견/종료일자를 변경하시겠습니까?`}
      onConfirm={handleConfirm}
      onClose={handleClose}
      confirmDisabled={isPending}
      disableBackdropClick
      disableEscapeKey={isPending}
    >
      <Flex $direction="column" $gap={8}>
        <Flex $align="flex-end" $gap={12}>
          <DateField
            label="파견일자"
            value={startDate}
            disabled={isPending}
            onChange={date => {
              setStartDate(date);
              setError("");
            }}
          />
          <Icon icon="Tilde" width={24} height={48} aria-hidden />
          <DateField
            label="종료일자"
            value={endDate}
            disabled={isPending}
            calendarAlign="right"
            onChange={date => {
              setEndDate(date);
              setError("");
            }}
          />
        </Flex>
        {error && (
          <Text $size="body3" $color={theme.color.subColor.red[20]}>
            {error}
          </Text>
        )}
      </Flex>
    </Modal>
  );
};
