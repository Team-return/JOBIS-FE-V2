import { useMutation } from "@tanstack/react-query";
import type {
  NotificationListResponse,
  NotificationTopicResponse
} from "./types";
import type { MutationOptions } from "@/QueryProvider";
import { createDomainApi } from "@/create-hook";
import { instance } from "@/instance";
import { notificationsKeys } from "./keys";

const DOMAIN = "/notifications";
const { createQueryHook, createMutationHook } = createDomainApi(DOMAIN);

export { notificationsKeys };

export const useNotificationList = createQueryHook<
  { is_new?: boolean },
  NotificationListResponse
>({
  path: "/",
  queryKey: params => notificationsKeys.notificationList(params?.is_new)
});

export const useReadNotification = createMutationHook<
  { notificationId: number },
  void
>({
  path: "/",
  method: "patch"
});

export const useToggleNotificationTopic = (
  options?: MutationOptions<{ topic: string }>
) => {
  return useMutation({
    mutationFn: async ({ topic }) => {
      await instance.patch(`${DOMAIN}/topic`, undefined, {
        params: { topic }
      });
    },
    ...options
  });
};

export const useToggleAllNotificationTopics = createMutationHook<void, void>({
  path: "/topics",
  method: "patch"
});

export const useNotificationTopicStatus = createQueryHook<
  void,
  NotificationTopicResponse
>({
  path: "/topic",
  queryKey: notificationsKeys.notificationTopicStatus
});
