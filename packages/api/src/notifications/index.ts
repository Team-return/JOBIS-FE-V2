import { useMutation } from "@tanstack/react-query";
import type {
  NotificationListResponse,
  NotificationTopicResponse
} from "./types";
import type { MutationOptions } from "@/QueryProvider";
import { createQueryHook, createMutationHook } from "@/create-hook";
import { instance } from "@/instance";
import { notificationsKeys } from "./keys";

const DOMAIN = "/notifications";

export { notificationsKeys };

export const useNotificationList = (isNew?: boolean) => {
  return createQueryHook<{ is_new?: boolean }, NotificationListResponse>({
    domain: DOMAIN,
    queryKey: () => notificationsKeys.notificationList(isNew)
  })({
    is_new: isNew
  });
};

export const useReadNotification = createMutationHook<
  { notificationId: number },
  void
>({
  domain: DOMAIN,
  method: "patch"
});

export const useToggleNotificationTopic = (
  options?: MutationOptions<{ topic: string }>
) => {
  return useMutation({
    mutationFn: async ({ topic }) => {
      await instance.patch(`${DOMAIN}/topic`, {
        params: { topic }
      });
    },
    ...options
  });
};

export const useToggleAllNotificationTopics = createMutationHook<void, void>({
  domain: `${DOMAIN}/topics`,
  method: "patch"
});

export const useNotificationTopicStatus = createQueryHook<
  void,
  NotificationTopicResponse
>({
  domain: `${DOMAIN}/topic`,
  queryKey: notificationsKeys.notificationTopicStatus
});
