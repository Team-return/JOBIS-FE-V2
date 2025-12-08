import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  NotificationListResponse,
  NotificationTopicResponse
} from "./types";
import type { QueryOptions, MutationOptions } from "@/QueryProvider";
import { instance } from "@/instance";

const DOMAIN = "/notifications";

export const useNotificationList = (
  isNew?: boolean,
  options?: QueryOptions<NotificationListResponse>
) => {
  return useQuery({
    queryKey: ["notification-list", isNew],
    queryFn: async () => {
      const { data } = await instance.get<NotificationListResponse>(DOMAIN, {
        params: { is_new: isNew }
      });
      return data;
    },
    ...options
  });
};

export const useReadNotification = (
  options?: MutationOptions<{ notificationId: number }>
) => {
  return useMutation({
    mutationFn: async ({ notificationId }) => {
      await instance.patch(`${DOMAIN}/${notificationId}`);
    },
    ...options
  });
};

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

export const useToggleAllNotificationTopics = (
  options?: MutationOptions<void>
) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/topics`);
    },
    ...options
  });
};

export const useNotificationTopicStatus = (
  options?: QueryOptions<NotificationTopicResponse>
) => {
  return useQuery({
    queryKey: ["notification-topic-status"],
    queryFn: async () => {
      const { data } = await instance.get<NotificationTopicResponse>(
        `${DOMAIN}/topic`
      );
      return data;
    },
    ...options
  });
};
