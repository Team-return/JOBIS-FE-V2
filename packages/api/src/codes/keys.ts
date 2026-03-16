export const codesKeys = {
  codeList: (params: {
    type: string;
    keyword?: string;
    parent_code?: number;
  }) => ["code-list", params]
} as const;
