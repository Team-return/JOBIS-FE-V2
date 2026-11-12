import type { NotificationTopic } from "@/enum";

interface Notification {
  notification_id: number;
  title: string;
  content: string;
  topic: NotificationTopic;
  detail_id: number;
  created_at: string;
  new: boolean;
}

export interface NotificationListResponse {
  notifications: Notification[];
}

interface TopicSubscription {
  topic: NotificationTopic;
  subscribed: boolean;
}

export interface NotificationTopicResponse {
  topics: TopicSubscription[];
}
