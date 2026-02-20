/**
 * @see {@link https://github.com/in-jun/ai-commit}
 * 이 모듈은 in-jun의 ai-commit 프로젝트에 영감을 받아
 * 프로젝트 코드베이스를 기반으로 재작성되었습니다.
 */

import process from "process";
import prompts from "prompts";
import { execa } from "execa";
import {
  logger,
  GITMOJI_MAP,
  SCOPE_MAP,
  git,
  detectScopesFromFiles
} from "./shared";

if (!process.env.GEMINI_API_KEY) {
  logger.error("GEMINI_API_KEY 환경변수가 설정되지 않았습니다");
  process.exit(1);
}

const runLintChecks = async () => {
  try {
    await execa("yarn", ["lint:fix"], { stdio: "inherit" });
    return true;
  } catch {
    logger.error("lint 오류를 해결해주세요.");
    return false;
  }
};

const detectScope = (files: string[]) => {
  const scopes = detectScopesFromFiles(files);
  return scopes.length === 1 ? scopes[0] : "RT";
};

const generateCommitMessage = async (diff: string, scope: string) => {
  const log = await git.getLog(true);
  const prompt = `
You are a Git commit message generator. Analyze the changes and generate a concise commit message.

Format: 
{emoji} (${scope}) :: [comment]

Gitmoji:
${Object.entries(GITMOJI_MAP)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}

Rules:
1. Comment must be under 30 characters
2. Use present tense, imperative mood
3. No body content allowed
4. Choose appropriate emoji from: ${Object.values(GITMOJI_MAP).join(", ")}
5. Focus on code changes rather than file names
6. 기술 용어는 원문을 쓰되, 메시지는 한국어를 기반으로 작성

History:
${log}

Changes:
${diff}

Generate ONLY the commit message:`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await response.json();
    const rawMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return rawMessage
      .split("\n")[0]
      .replace(/\s+/g, " ")
      .replace(/(✨|🐛|📝|♻️|🧪|🧱|🔥)\s*\((\w{2})\)\s*::\s*/i, "$1 ($2) :: ")
      .trim();
  } catch (error) {
    logger.error("AI 메시지 생성 실패", error);
    process.exit(1);
  }
};

const runAICommit = async () => {
  const stagedFiles = await git.getStagedFiles();
  if (stagedFiles.length === 0) {
    logger.error("스테이징된 파일이 없습니다");
    return;
  }

  if (!(await runLintChecks())) return;

  const scope = detectScope(stagedFiles);
  const scopeName = SCOPE_MAP[scope] || scope;
  logger.info(`감지된 작업 범위: ${scopeName}`);

  const diff = await git.getDiff();

  const aiMessage = await generateCommitMessage(diff, scope);

  const { action } = await prompts({
    type: "select",
    name: "action",
    message: `생성된 메시지: ${aiMessage}`,
    choices: [
      { title: "커밋", value: "commit" },
      { title: "수정", value: "edit" },
      { title: "취소", value: "cancel" }
    ],
    initial: 0
  });

  if (action === "cancel") {
    logger.info("커밋이 취소되었습니다");
    return;
  }

  let finalMessage = aiMessage;
  if (action === "edit") {
    const { message } = await prompts({
      type: "text",
      name: "message",
      message: "커밋 메시지를 수정해주세요",
      initial: aiMessage,
      validate: value =>
        value.length > 30 ? "메시지는 30자 이내로 작성해주세요" : true
    });
    if (message) {
      finalMessage = message;
    } else {
      logger.info("커밋이 취소되었습니다");
      return;
    }
  }

  if (await git.commit(finalMessage)) {
    logger.success("성공적으로 커밋되었습니다");
  }
};

runAICommit();
