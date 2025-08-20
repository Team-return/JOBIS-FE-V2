import { readFileSync } from "fs";
import process from "process";

import { logger, validateCommitMessage } from "./shared";

const commitMsgFilePath = process.argv[2];

if (!commitMsgFilePath) {
  logger.error("커밋 메시지에 접근할 수 없습니다.");
  process.exit(1);
}

const commitMessage = readFileSync(commitMsgFilePath, "utf8").trim();

const result = validateCommitMessage(commitMessage);
process.exit(result ? 0 : 1);
