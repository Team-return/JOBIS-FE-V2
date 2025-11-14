export const headerTypes = ["admin", "company", "student"] as const;
export type HeaderTypes = (typeof headerTypes)[number];

interface BaseProps {
  types?: HeaderTypes;
}

interface AdminProps extends BaseProps {
  types: "admin";
}

interface CompanyProps extends BaseProps {
  types: "company";
}

interface StudentProps extends BaseProps {
  types: "student";
  onClickProfile?: () => void;
  userName: string;
  alarm?: boolean;
}

export type Props = AdminProps | CompanyProps | StudentProps;
