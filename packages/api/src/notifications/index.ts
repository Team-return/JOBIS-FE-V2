import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  NotificationListResponse,
  NotificationTopicResponse
} from "./types";
import { instance } from "@/instance";

const DOMAIN = "/notifications";

export const useNotificationList = (isNew?: boolean) => {
  return useQuery({
    queryKey: ["notification-list", isNew],
    queryFn: async () => {
      const { data } = await instance.get<NotificationListResponse>(DOMAIN, {
        params: { is_new: isNew }
      });
      return data;
    }
  });
};

export const useReadNotification = (notificationId: number) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/${notificationId}`);
    }
  });
};

export const useToggleNotificationTopic = (topic: string) => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/topic`, {
        params: { topic }
      });
    }
  });
};

export const useToggleAllNotificationTopics = () => {
  return useMutation({
    mutationFn: async () => {
      await instance.patch(`${DOMAIN}/topics`);
    }
  });
};

export const useNotificationTopicStatus = () => {
  return useQuery({
    queryKey: ["notification-topic-status"],
    queryFn: async () => {
      const { data } = await instance.get<NotificationTopicResponse>(
        `${DOMAIN}/topic`
      );
      return data;
    }
  });
};
