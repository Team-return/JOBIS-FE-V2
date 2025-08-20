import process from "process";
import picocolors from "picocolors";
import { GITMOJI_MAP, SCOPE_MAP, logger, git, COMMIT_REGEX } from "./shared";
const { cyan, green, bold, gray, blue, dim } = picocolors;

interface Commit {
  hash: string;
  date: string;
  author: string;
  type: string;
  scope: string;
  comment: string;
}

const getScopeIcon = (scope: string) => {
  const icons = { AD: "👑", CO: "🏢", ST: "🎓", DS: "🎨", RT: "🌳" };
  return icons[scope as keyof typeof icons] || "📁";
};

const createProgressBar = (current: number, total: number) => {
  const width = 30;
  const filled = Math.round((current / total) * width);
  const empty = width - filled;
  const percentage = Math.round((current / total) * 100);

  return `${green("▓".repeat(filled))}${gray("░".repeat(empty))} ${cyan(`${percentage}%`)}`;
};

export const analyzeCommitHistory = async () => {
  try {
    logger.info("커밋 히스토리를 가져오는 중...");

    const stdout = await git.getLog();

    const allLines = stdout.split("\n");

    const commits: Commit[] = [];
    const invalidCommits: string[] = [];

    console.log(`\n${blue("●")} 총 ${bold(allLines.length)}개 커밋 발견`);
    console.log(`${blue("●")} 메시지 검증 중...\n`);

    allLines.forEach((line, index) => {
      if (index % 5 === 0 || index === allLines.length - 1) {
        process.stdout.write(
          `\r  ${createProgressBar(index + 1, allLines.length)}`
        );
      }

      const [hash, date, author, message] = line.split("|");
      const match = message.match(COMMIT_REGEX);

      if (!match) {
        invalidCommits.push(
          `${gray(hash.slice(0, 7))} ${message.length > 20 ? message.slice(0, 20) + "..." : message}`
        );
        return;
      }

      const [, type, scope, comment] = match;
      commits.push({ hash, date, author, type, scope, comment });
    });

    console.log("\n");

    if (invalidCommits.length > 0) {
      logger.warn(
        `규칙을 준수하지 않는 커밋 ${bold(invalidCommits.length)}개 발견`
      );
      invalidCommits.slice(0, 5).forEach(commit => {
        console.log(`  ${dim("•")} ${commit}`);
      });
      if (invalidCommits.length > 5) {
        console.log(`  ${dim(`... 외 ${invalidCommits.length - 5}개`)}`);
      }
      console.log();
    }

    const groupedCommits = commits.reduce(
      (acc, commit) => {
        if (!acc[commit.scope]) acc[commit.scope] = [];
        acc[commit.scope].push(commit);
        return acc;
      },
      {} as Record<string, Commit[]>
    );

    logger.divider("━", 60);
    console.log(bold("\n📊 스코프별 커밋 분석\n"));

    Object.entries(groupedCommits).forEach(([scope, scopeCommits]) => {
      const scopeName = SCOPE_MAP[scope] || scope;
      const scopeIcon = getScopeIcon(scope);

      console.log(
        `\n${scopeIcon} ${bold(cyan(scopeName))} ${dim(`(${scope})`)} ${gray(`─ ${scopeCommits.length}개`)}`
      );
      console.log(dim("─".repeat(60)));

      scopeCommits.forEach(commit => {
        const emojiKey =
          Object.entries(GITMOJI_MAP).find(
            ([, emoji]) => emoji === commit.type
          )?.[0] || commit.type;
        const shortHash = commit.hash.slice(0, 7);

        if (process.stdout.isTTY) {
          const leftText = `  ${commit.type} ${commit.comment}`;

          process.stdout.write(leftText);

          const cursorMove = `\x1B[40G`;
          process.stdout.write(cursorMove);

          const rightText = `${gray(commit.date)} ${cyan(shortHash)} ${dim(commit.author)} ${dim(`[${emojiKey}]`)}`;
          process.stdout.write(`${rightText}\n`);
        } else {
          console.log(
            `  ${commit.type} ${commit.comment} ${gray(commit.date)} ${cyan(shortHash)} ${dim(commit.author)} ${dim(`[${emojiKey}]`)}`
          );
        }
      });

      const typeStats = scopeCommits.reduce(
        (acc, commit) => {
          const emojiKey =
            Object.entries(GITMOJI_MAP).find(
              ([, emoji]) => emoji === commit.type
            )?.[0] || "other";
          acc[emojiKey] = (acc[emojiKey] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const statsStr = Object.entries(typeStats)
        .map(([type, count]) => `${type}(${count})`)
        .join(" ");
      console.log(`  ${dim(`└ 타입: ${statsStr}`)}`);
    });

    const totalCommits = commits.length + invalidCommits.length;
    const accuracy = Math.round((commits.length / totalCommits) * 100);

    console.log(`${green("●")} 유효한 커밋: ${bold(commits.length)}개`);
    console.log(
      `${blue("●")} 스코프 그룹: ${bold(Object.keys(groupedCommits).length)}개`
    );
    if (invalidCommits.length > 0) {
      console.log(`${blue("●")} 규칙 미준수: ${bold(invalidCommits.length)}개`);
    }
    console.log(`${cyan("●")} 전체 정확도: ${bold(`${accuracy}%`)}`);

    logger.divider("━", 60);
  } catch (error) {
    logger.error("커밋 히스토리 분석 실패", error);
  }
};

analyzeCommitHistory();
