import picocolors from "picocolors";
import { execa } from "execa";
import process from "process";
const { red, green, blue, yellow, magenta, bold, dim } = picocolors;

export const GITMOJI_MAP = {
  feat: "✨",
  fix: "🐛",
  docs: "📝",
  refactor: "♻️",
  test: "🧪",
  chore: "🧱",
  burn: "🔥"
};

export const SCOPE_MAP: Record<string, string> = {
  AD: "Admin",
  CO: "Company",
  ST: "Student",
  DS: "Design System",
  AP: "API",
  RT: "Root"
};

export const COMMIT_SCOPES = [
  { code: "AD", path: "apps/admin/" },
  { code: "CO", path: "apps/company/" },
  { code: "ST", path: "apps/student/" },
  { code: "AP", path: "packages/api/" },
  { code: "DS", path: "packages/design-system/" }
];

export const COMMIT_REGEX = /^(\p{Emoji}\uFE0F?)\s\(([A-Z]{2})\)\s::\s(.*)$/u;

export const git = {
  async getStagedFiles(): Promise<string[]> {
    try {
      const { stdout } = await execa("git", [
        "diff",
        "--cached",
        "--name-only"
      ]);
      return stdout.trim().split("\n").filter(Boolean);
    } catch (error) {
      logger.error("스테이징된 파일 조회 실패", error);
      process.exit(1);
    }
  },

  async getDiff(): Promise<string> {
    try {
      const { stdout } = await execa("git", [
        "diff",
        "--cached",
        "--",
        ".",
        `:!yarn.lock`
      ]);
      return stdout;
    } catch (error) {
      logger.error("Git diff 조회 실패", error);
      process.exit(1);
    }
  },

  async commit(message: string): Promise<boolean> {
    try {
      await execa("git", ["commit", "-m", message]);
      return true;
    } catch (error) {
      logger.error("커밋 실행 실패", error);
      return false;
    }
  },

  async getLog(simple: boolean = false): Promise<string> {
    try {
      const args = simple
        ? ["log", "--oneline", "--no-merges", "-n", "10"]
        : [
            "log",
            "--no-merges",
            "--pretty=format:%h|%ad|%an|%s",
            "--date=format:%y-%m-%d"
          ];
      const { stdout } = await execa("git", args);
      return stdout;
    } catch (error) {
      logger.error("커밋 히스토리 조회 실패", error as Error);
      process.exit(1);
    }
  }
};

export const detectScopesFromFiles = (files: string[]): string[] => {
  const detectedScopes = new Set<string>();

  files.forEach(file => {
    const matchedScope = COMMIT_SCOPES.find(({ path }) =>
      file.replace(/\\/g, "/").startsWith(path)
    );
    detectedScopes.add(matchedScope ? matchedScope.code : "RT");
  });

  return [...detectedScopes];
};

export const logger = {
  success(message: string, details?: string) {
    console.log(`${green("●")} ${bold(message)}`);
    if (details) {
      console.log(`  ${dim("└")} ${green(details)}`);
    }
  },

  error(message: string, error?: Error | string[]) {
    console.log(`${red("●")} ${bold(message)}`);

    if (error instanceof Error) {
      console.log(`  ${dim("└")} ${red(error.message)}`);
      if (error.stack) {
        console.log(
          `     ${dim(error.stack.split("\n").slice(1, 3).join("\n     "))}`
        );
      }
    } else if (Array.isArray(error)) {
      error.forEach((err, index) => {
        const prefix = index === error.length - 1 ? "└" : "├";
        console.log(`  ${dim(prefix)} ${red(err)}`);
      });
    }
  },

  info(message: string) {
    console.log(`${blue("●")} ${message}`);
  },

  warn(message: string) {
    console.log(`${yellow("●")} ${bold(message)}`);
  },

  debug(message: string, data?: object) {
    console.log(`${magenta("●")} ${message}`);
    if (data) {
      console.log(
        `  ${dim("└")} ${dim(JSON.stringify(data, null, 2).split("\n").join("\n     "))}`
      );
    }
  },

  divider(char = "─", length = 50) {
    console.log(dim(char.repeat(length)));
  }
};

export const validateCommitMessage = (message: string) => {
  if (!message) {
    logger.error("커밋 메시지가 비어있습니다. 커밋 메시지를 작성해주세요.");
    return false;
  }

  const allowedTypes = Object.values(GITMOJI_MAP);
  const allowedScopes = Object.keys(SCOPE_MAP);

  const match = message.match(COMMIT_REGEX);

  if (!match) {
    logger.error("커밋 메시지 형식이 올바르지 않습니다.", [
      "올바른 형식: type (scope) :: comment",
      `허용되는 type: ${allowedTypes.join(", ")}`,
      `허용되는 scope: ${allowedScopes.join(", ")}`,
      "예시: ✨ (AD) :: 관리자 기능 추가",
      "스코프는 대문자 2글자로 작성해야 합니다"
    ]);
    return false;
  }

  const [, type, scope, comment] = match;

  if (!allowedTypes.includes(type)) {
    logger.error(`허용되지 않는 커밋 유형입니다: "${type}"`, [
      `허용되는 type: ${allowedTypes.join(", ")}`
    ]);
    return false;
  }

  if (!allowedScopes.includes(scope)) {
    logger.error(`허용되지 않는 작업 범위입니다: "${scope}"`, [
      `허용되는 scope: ${allowedScopes.join(", ")}`,
      "스코프는 대문자 2글자로 작성해야 합니다"
    ]);
    return false;
  }

  if (comment.length === 0) {
    logger.error("커밋 설명이 비어있습니다.");
    return false;
  }

  if (comment.length > 30) {
    logger.error("커밋 설명은 30자 이내로 작성해야 합니다.", [
      `현재 글자 수: ${comment.length}`
    ]);
    return false;
  }

  logger.success("커밋 메시지 규칙을 준수합니다.");
  return true;
};
