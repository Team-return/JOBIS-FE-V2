export const headerTypes = ["admin", "company", "student"] as const;
export type HeaderTypes = (typeof headerTypes)[number];
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
  types: HeaderTypes;
  onClickLogo?: () => void;
}

interface AdminProps extends BaseProps {
  types: "admin";
}

interface CompanyProps extends BaseProps {
  types: "company";
}

interface StudentProps extends BaseProps {
  types: "student";
  userName: string;
  alarm?: boolean;
  notifications?: Notification[];
}

export type Props = AdminProps | CompanyProps | StudentProps;
