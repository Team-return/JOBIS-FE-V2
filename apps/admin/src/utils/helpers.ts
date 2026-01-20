export const formatDate = (date?: Date | string): string | undefined => {
  if (!date) return undefined;
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString().split("T")[0];
};

export const booleanToYN = (value: boolean): string => {
  return value ? "Y" : "N";
};
