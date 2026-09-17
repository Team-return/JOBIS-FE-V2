export interface InfoItem {
  label: string;
  value: string;
  itemType?: "text" | "file";
  fileUrl?: string;
  expandableContent?: InfoItem[];
}

export interface DetailTableProps {
  items: InfoItem[];
}
