import {
  FileDownload,
  FileUpload,
  Flex,
  Modal,
  TextArea,
  useToast
} from "@jobis/design-system";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useRejectApplications, useUploadFiles } from "@jobis/api";
import { getErrorMessage, toFileUrl } from "../../utils";
import { getTargetLabel } from "./targetLabel";

// 서버가 반려 사유를 100자까지만 받는다
const REASON_MAX_LENGTH = 100;

interface UploadedFile {
  id: number;
  name: string;
  url: string;
}

interface Props {
  applicationIds: number[];
  studentNames: string[];
  onSuccess: () => void | Promise<void>;
  onError: () => void | Promise<void>;
  onClose: () => void;
}

export const RejectModal = ({
  applicationIds,
  studentNames,
  onSuccess,
  onError,
  onClose
}: Props) => {
  const toast = useToast();

  const inputRef = useRef<HTMLInputElement>(null);
  const lastIdRef = useRef(0);

  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const { mutate: uploadFiles, isPending: isUploading } = useUploadFiles(
    "EXTENSION_FILE",
    {
      onSuccess: (urls, selected) => {
        setFiles(prev => [
          ...prev,
          ...urls.map((url, index) => {
            lastIdRef.current += 1;

            return {
              id: lastIdRef.current,
              name: selected[index]?.name || url.split("/").pop() || url,
              url
            };
          })
        ]);
      },
      onError: status =>
        toast.error(
          status === 400
            ? "지원하지 않는 파일 형식입니다."
            : "첨부파일 업로드에 실패했습니다."
        )
    }
  );

  const { mutate: rejectApplications, isPending: isRejecting } =
    useRejectApplications();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);

    if (selected.length > 0) {
      uploadFiles(selected);
    }

    // 같은 파일을 연속으로 선택해도 change 이벤트가 발생하도록 초기화
    event.target.value = "";
  };

  const removeFile = (fileId: number) => {
    if (isRejecting) return;
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // 요청 중에 닫으면 완료 처리(안내·목록 갱신·선택 해제)가 실행되지 않으므로 막는다
  const handleClose = () => {
    if (isRejecting) return;
    onClose();
  };

  const handleConfirm = () => {
    const trimmedReason = reason.trim();
    if (!trimmedReason) {
      setReasonError("반려 사유를 입력해주세요.");
      return;
    }
    if (trimmedReason.length > REASON_MAX_LENGTH) {
      setReasonError(`반려 사유는 ${REASON_MAX_LENGTH}자 이내로 입력해주세요.`);
      return;
    }

    rejectApplications(
      {
        application_ids: applicationIds,
        reason: trimmedReason,
        rejection_attachments: files.map(file => ({ url: file.url }))
      },
      {
        onSuccess: async () => {
          toast.success("상태가 변경되었습니다.");
          await onSuccess();
          onClose();
        },
        onError: async error => {
          toast.error(
            getErrorMessage(error, "반려에 실패했습니다.", {
              400: "반려할 수 없는 지원서가 포함돼 있습니다."
            })
          );
          // 여러 건 중 일부만 반려됐을 수 있어 목록은 다시 받는다
          await onError();
        }
      }
    );
  };

  return (
    <Modal
      title="상태변경"
      content={`${getTargetLabel(studentNames)} 지원서를 반려(으)로 바꾸시겠습니까?`}
      onConfirm={handleConfirm}
      onClose={handleClose}
      confirmDisabled={isUploading || isRejecting}
      disableBackdropClick
      disableEscapeKey={isRejecting}
    >
      <Flex $direction="column" $gap={32}>
        <TextArea
          value={reason}
          onChange={value => {
            setReason(value);
            if (reasonError && value.trim()) setReasonError("");
          }}
          placeholder="반려사유를 입력해주세요."
          maxLength={REASON_MAX_LENGTH}
          $height={116}
          $errorMessage={reasonError}
          disabled={isRejecting}
        />
        <Flex $direction="column" $gap={12}>
          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            aria-label="반려 첨부 파일 추가"
            onChange={handleFileChange}
          />
          <FileUpload
            label={isUploading ? "업로드 중..." : "파일 추가하기"}
            disabled={isUploading || isRejecting}
            onClick={() => inputRef.current?.click()}
          />
          {files.length > 0 && (
            <Flex $direction="row" $gap={8} $wrap>
              {files.map(file => (
                <FileDownload
                  key={file.id}
                  label={file.name}
                  fileUrl={toFileUrl(file.url)}
                  onRemove={() => removeFile(file.id)}
                />
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};
