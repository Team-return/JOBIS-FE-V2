export const studentsKeys = {
  studentMy: () => ["student-my"],
  studentExists: (gcn?: string, name?: string) => ["student-exists", gcn, name]
} as const;
