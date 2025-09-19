interface Notification {
  notification_id: number;
  title: string;
  content: string;
  topic: string;
  detail_id: number;
  created_at: string;
  new: boolean;
}

export interface NotificationListResponse {
  notifications: Notification[];
}

interface NotificationTopic {
  topic: string;
  subscribed: boolean;
}

export interface NotificationTopicResponse {
  topics: NotificationTopic[];
}
