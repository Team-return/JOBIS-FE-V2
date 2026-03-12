export const studentsKeys = {
  studentMy: () => ["student-my"],
  studentExists: (params?: { gcn?: string; name?: string }) => [
    "student-exists",
    params
  ]
} as const;
