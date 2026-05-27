import {
  resetToken,
  useDeleteApplication,
  useStudentApplications,
  useStudentMy
} from "@jobis/api";
import {
  ApplicationState,
  Container,
  Flex,
  Modal,
  ProfileBar,
  Text,
  useToast
} from "@jobis/design-system";
import { SERVER_STATUS_MAP } from "@jobis/design-system";
import { useState } from "react";

export const MyPage = () => {
  const { error } = useToast();
  const [cancelTargetId, setCancelTargetId] = useState<number | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data: profile } = useStudentMy();
  const { data: applicationList } = useStudentApplications();
  const applications = applicationList?.applications || [];
  const { mutate: deleteApplication } = useDeleteApplication({
    onSuccess: () => setCancelTargetId(null),
    onError: () => error("지원 취소에 실패했습니다. 잠시 후 다시 시도해주세요.")
  });
  const cancelTarget = applications.find(
    a => a.application_id === cancelTargetId
  );

  return (
    <Container $maxWidth={668} $padding={[60, 0, 386, 0]}>
      <Flex $direction="column" $gap={50} $align="center">
        <ProfileBar
          name={profile?.student_name || ""}
          studentNumber={profile?.student_gcn || ""}
          department={profile?.department || ""}
          profileImageUrl={profile?.profile_image_url || ""}
          menuItems={[
            {
              label: "프로필 수정",
              onClick: () => {
                error("준비중인 기능입니다");
              }
            },
            {
              label: "비밀번호 변경",
              onClick: () => {
                error("준비중인 기능입니다");
              }
            },
            {
              label: "버그 제보하기",
              onClick: () => {
                error("준비중인 기능입니다");
              }
            },
            {
              label: "로그아웃",
              onClick: () => setShowLogoutModal(true)
            }
          ]}
        />
        <Flex $gap={8} $direction="column">
          <Text $size="body1">내가 지원한 회사</Text>
          <Flex $gap={12} $direction="column" $align="center">
            {applications.length === 0 ? (
              <Text $size="body2">지원한 회사가 없습니다.</Text>
            ) : (
              applications.map(application => (
                <ApplicationState
                  key={application.application_id}
                  types={SERVER_STATUS_MAP[application.application_status]}
                  imgUrl={application.company_logo_url}
                  companyName={application.company}
                  date={application.created_at}
                  onRetry={() => {
                    error("준비중인 기능입니다");
                  }}
                  onCancle={() => setCancelTargetId(application.application_id)}
                />
              ))
            )}
          </Flex>
        </Flex>
      </Flex>
      {showLogoutModal && (
        <Modal
          title="로그아웃"
          content="로그아웃 하시겠습니까?"
          onConfirm={() => {
            resetToken();
            window.location.href = "/login";
          }}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
      {cancelTargetId !== null && cancelTarget && (
        <Modal
          title="지원 취소"
          content={`${cancelTarget.company}에 지원을 취소하시겠습니까?`}
          onConfirm={() => deleteApplication(cancelTargetId)}
          onClose={() => setCancelTargetId(null)}
        />
      )}
    </Container>
  );
};
