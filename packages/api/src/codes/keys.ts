export const codesKeys = {
  codeList: (type: string, keyword?: string, parentCode?: number) => [
    "code-list",
    type,
    keyword,
    parentCode
  ]
} as const;
