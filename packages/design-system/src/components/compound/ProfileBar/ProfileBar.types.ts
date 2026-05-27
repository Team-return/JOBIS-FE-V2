interface MenuItem {
  label: string;
  onClick: () => void;
}

export interface Props {
  name: string;
  studentNumber: string;
  department: string;
  profileImageUrl?: string;
  menuItems?: MenuItem[];
}
