export type HeaderType = "admin" | "company" | "student";

interface Notification {
  notification_id: number;
  title: string;
  content: string;
  topic: string;
  detail_id: number;
  created_at: string;
  new: boolean;
}
interface BaseProps {
  type: HeaderType;
}

interface AdminProps extends BaseProps {
  type: "admin";
}

interface CompanyProps extends BaseProps {
  type: "company";
}

interface StudentProps extends BaseProps {
  type: "student";
  userName: string;
  notifications?: Notification[];
}

export type Props = AdminProps | CompanyProps | StudentProps;
