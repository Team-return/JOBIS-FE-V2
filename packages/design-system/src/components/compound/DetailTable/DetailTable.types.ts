export interface InfoItem {
  label: string;
  value: string;
  itemType?: "text" | "file";
  fileUrl?: string;
}

export interface DetailTableProps {
  items: InfoItem[];
}
