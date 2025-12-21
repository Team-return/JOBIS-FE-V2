export const notificationsKeys = {
  notificationList: (isNew?: boolean) => ["notification-list", isNew],
  notificationTopicStatus: () => ["notification-topic-status"]
} as const;
