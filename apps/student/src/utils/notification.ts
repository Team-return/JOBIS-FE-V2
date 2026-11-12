import type { NotificationTopic } from "@jobis/api";

// 서버는 topic마다 detail_id에 공지·모집의뢰서·지원서·면접 id를 담는다
const NOTIFICATION_PATHS: Record<
  NotificationTopic,
  (detailId: number) => string | undefined
> = {
  NOTICE: detailId => `/notice/detail/${detailId}`,
  RECRUITMENT: detailId => `/recruitment/detail/${detailId}`,
  // 겨울인턴 시즌 안내 알림은 detail_id가 0이다.
  // status=WIN_INTERN은 서버가 상태로 걸러 상태가 덮어써진 공고만 나오므로 쓰지 않는다
  WINTER_INTERN: detailId =>
    detailId > 0
      ? `/recruitment/detail/${detailId}`
      : "/recruitment?winter_intern=true",
  // 지원서 id만 오므로 지원 현황이 있는 마이페이지로 보낸다
  APPLICATION: () => "/mypage",
  // 학생 면접 화면이 없어 읽음 처리만 한다
  INTERVIEW: () => undefined
};

const isNotificationTopic = (topic: string): topic is NotificationTopic =>
  Object.prototype.hasOwnProperty.call(NOTIFICATION_PATHS, topic);

/** 알림을 눌렀을 때 이동할 경로. 이동할 화면이 없으면 undefined */
export const getNotificationPath = (topic: string, detailId: number) =>
  isNotificationTopic(topic) ? NOTIFICATION_PATHS[topic](detailId) : undefined;
