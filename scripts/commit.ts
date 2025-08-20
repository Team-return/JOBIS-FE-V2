import process from "process";
import prompts from "prompts";
import { execa } from "execa";

import {
  logger,
  validateCommitMessage,
  GITMOJI_MAP,
  SCOPE_MAP,
  git,
  detectScopesFromFiles
} from "./shared";

const COMMIT_TYPES = [
  { title: "✨\tfeat :: 새로운 기능 추가", value: "feat" },
  { title: "🐛\tfix :: 버그 수정", value: "fix" },
  { title: "📝\tdocs :: 문서/주석 변경", value: "docs" },
  { title: "♻️\trefactor :: 코드 리팩토링", value: "refactor" },
  { title: "🧪\ttest :: 테스트 코드 추가/수정", value: "test" },
  { title: "🧱\tchore :: 프로젝트 구성/설정 관리", value: "chore" },
  { title: "🔥\tburn :: 잡것 소각", value: "burn" }
];

const getCurrentBranch = async () => {
  const { stdout } = await execa("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  return stdout.trim();
};

const runLintChecks = async () => {
  try {
    await execa("yarn", ["lint", "--fix"], { stdio: "inherit" });
    await execa("yarn", ["lint"], { stdio: "inherit" });
    return true;
  } catch {
    logger.error("lint 오류를 해결해주세요.");
    return false;
  }
};

async function promptCommitInfo(): Promise<{
  type: string;
  comment: string;
} | null> {
  const response = await prompts(
    [
      {
        type: "select",
        name: "type",
        message: "커밋 유형을 선택해주세요",
        choices: COMMIT_TYPES,
        initial: 0
      },
      {
        type: "text",
        name: "comment",
        message: "변경 사항을 설명해주세요 (30자 이내)",
        validate: value => {
          if (value.length === 0) return "필수 입력입니다.";
          if (value.length > 30) return `${value.length}자 (30자 초과)`;
          return true;
        }
      }
    ],
    {
      onCancel: () => {
        logger.info("📝 커밋 작성이 취소되었습니다.");
        process.exit(0);
      }
    }
  );

  return Object.keys(response).length > 0 ? response : null;
}

const executeCommit = async (scope: string, type: string, comment: string) => {
  const emoji = GITMOJI_MAP[type];
  const commitMessage = `${emoji} (${scope}) :: ${comment}`;

  if (!validateCommitMessage(commitMessage)) {
    logger.error("생성된 커밋 메시지가 유효하지 않습니다.");
    return false;
  }

  try {
    await execa("git", ["commit", "-m", commitMessage]);
    logger.success("커밋 성공!");
    logger.info(`커밋 메시지: ${commitMessage}`);
    return true;
  } catch (error) {
    logger.error("커밋 중 오류가 발생했습니다", error);
    return false;
  }
};

const executeInteractiveCommit = async () => {
  try {
    const currentBranch = await getCurrentBranch();

    const logBranch = currentBranch === "main" ? logger.warn : logger.info;
    logBranch(`현재 브랜치는 ${currentBranch} 입니다.`);

    if (!(await runLintChecks())) return false;

    const stagedFiles = await git.getStagedFiles();
    if (stagedFiles.length === 0) {
      logger.error("스테이징된 파일이 없습니다.");
      return false;
    }
    logger.info(`${stagedFiles.length}개의 스테이징된 파일이 감지되었습니다.`);

    const detectedScopes = detectScopesFromFiles(stagedFiles);
    if (detectedScopes.length > 1) {
      logger.error("변경은 하나의 작업 범위에서만 이루어져야 합니다.", [
        `작업 범위: ${detectedScopes}`
      ]);
    }
    const scope = detectedScopes[0];
    logger.info(`감지된 작업 범위: ${SCOPE_MAP[scope]}`);

    const commitInfo = await promptCommitInfo();
    if (!commitInfo) return true;

    return await executeCommit(scope, commitInfo.type, commitInfo.comment);
  } catch (error) {
    logger.error("시스템 오류가 발생했습니다", error);
    return false;
  }
};

const result = await executeInteractiveCommit();
process.exit(result ? 0 : 1);
