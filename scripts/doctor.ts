import process from "process";
import { execa } from "execa";
import { readFile, access } from "fs/promises";
import prompts from "prompts";
import path from "path";
import { logger } from "./shared";

const MANUAL_FLAG = "--manual";

const checkExists = async (filePath: string) => {
  try {
    await access(path.join(process.cwd(), filePath));
    return true;
  } catch {
    return false;
  }
};

interface Check {
  name: string;
  run: () => Promise<boolean | string>;
}

const checks: Check[] = [
  {
    name: ".nvmrc file",
    async run() {
      const nvmrcExists = await checkExists(".nvmrc");
      if (!nvmrcExists) return "`.nvmrc` 파일이 없습니다.";

      const requiredVersion = (
        await readFile(path.join(process.cwd(), ".nvmrc"), "utf-8")
      ).trim();
      const currentVersion = process.version.replace("v", "").trim();

      if (currentVersion !== requiredVersion) {
        return `현재 Node.js 버전(v${currentVersion})이 .nvmrc(v${requiredVersion})와 일치하지 않습니다. 'nvm use'를 실행해주세요.`;
      }

      return true;
    }
  },
  {
    name: ".yarnrc.yml configuration",
    async run() {
      const yarnrcExists = await checkExists(".yarnrc.yml");
      if (!yarnrcExists) return "`.yarnrc.yml` 파일이 없습니다.";

      const yarnrcContent = await readFile(
        path.join(process.cwd(), ".yarnrc.yml"),
        "utf-8"
      );
      if (!yarnrcContent.includes("nodeLinker: node-modules")) {
        return "`.yarnrc.yml`에 `nodeLinker: node-modules` 설정이 없습니다.";
      }

      return true;
    }
  },
  {
    name: "Git installation",
    async run() {
      try {
        await execa("git", ["--version"]);
        return true;
      } catch {
        return "Git이 설치되어 있지 않거나 PATH에 없습니다.";
      }
    }
  },
  {
    name: "Yarn installation",
    async run() {
      try {
        await execa("yarn", ["--version"]);
        return true;
      } catch {
        return "Yarn이 설치되어 있지 않거나 PATH에 없습니다.";
      }
    }
  },
  {
    name: "Dependency installation",
    async run() {
      const exists = await checkExists("node_modules");
      return exists
        ? true
        : "`node_modules` 폴더를 찾을 수 없습니다. `yarn install`을 실행해주세요.";
    }
  },
  {
    name: "Husky configuration",
    async run() {
      const huskyDir = await checkExists(".husky");
      if (!huskyDir)
        return "`.husky` 디렉토리가 없습니다. `yarn prepare`를 실행하여 Husky를 설정해주세요.";

      const commitMsgHook = await checkExists(".husky/commit-msg");
      if (!commitMsgHook) return "`.husky/commit-msg` 훅이 없습니다.";

      const preCommitHook = await checkExists(".husky/pre-commit");
      if (!preCommitHook) return "`.husky/pre-commit` 훅이 없습니다.";

      return true;
    }
  },
  {
    name: ".editorconfig file",
    async run() {
      const exists = await checkExists(".editorconfig");
      return exists ? true : "`.editorconfig` 파일이 없습니다.";
    }
  },
  {
    name: ".env file",
    async run() {
      const exists = await checkExists(".env");
      return (
        exists ||
        "`.env` 파일이 없습니다. 개발 환경에 필요한 환경변수를 설정해주세요."
      );
    }
  }
];

const runDoctor = async () => {
  logger.info("🩺 JOBIS Doctor");
  logger.divider();

  let failures = 0;

  for (const check of checks) {
    try {
      const result = await check.run();
      if (result === true) {
        logger.success(check.name);
      } else {
        logger.error(check.name, [String(result || "알 수 없는 오류")]);
        failures++;
      }
    } catch (error) {
      logger.error(
        check.name,
        error instanceof Error ? error : [String(error)]
      );
      failures++;
    }
  }

  logger.divider();

  if (failures === 0) {
    logger.success("모든 검사를 통과했습니다.");
    logger.debug(
      "만약 문제가 해결되지 않았다면 `yarn doctor --manual`을 실행하세요"
    );
    return true;
  } else {
    logger.error(`${failures}개의 문제가 발견되었습니다.`);
    return false;
  }
};

const runManual = async () => {
  logger.info("🩺 JOBIS Manual Doctor");
  logger.divider();

  const manualChecks = [
    {
      name: "package-manager",
      message: "Yarn을 사용하고 계신가요?",
      instructions: "개발 환경은 Yarn을 사용한다는 가정 하에 설정되었습니다."
    },
    {
      name: "vscode-ide",
      message: "VSCode를 IDE로 사용하고 계신가요?",
      instructions: "이 프로젝트는 VSCode에 최적화된 설정을 포함하고 있습니다."
    },
    {
      name: "eslint-extension",
      message: "ESLint VSCode 확장 프로그램이 3.0.10 버전인가요?",
      instructions:
        "최신 버전의 확장 프로그램은 린터가 ESLint 오류를 감지하지 못하게 합니다."
    },
    {
      name: "modified-config",
      message: "설정 파일(e.g., .eslintrc, package.json)을 수정하지 않았나요?",
      instructions:
        "상의되지 않은 설정 변경은 협업 및 안정성에 문제를 일으킬 수 있습니다."
    }
  ];

  const responses = await prompts(
    manualChecks.map(check => ({
      type: "confirm",
      name: check.name,
      message: check.message,
      initial: true
    })),
    {
      onCancel: () => {
        logger.warn("수동 검사를 취소했습니다.");
        process.exit(0);
      }
    }
  );

  if (Object.keys(responses).length === 0) {
    return false;
  }

  const allPassed = manualChecks.every(check => responses[check.name]);

  logger.divider();
  logger.info("수동 검사 결과:");

  manualChecks.forEach(check => {
    if (responses[check.name]) {
      logger.success(check.message);
    } else {
      logger.error(check.message, [check.instructions]);
    }
  });

  logger.divider();

  if (allPassed) {
    logger.success("모든 수동 검사를 통과했습니다.");
  } else {
    logger.error(
      "일부 항목이 '아니오'로 응답되었습니다. 위의 안내에 따라 환경을 확인해주세요."
    );
  }

  return allPassed;
};

(async () => {
  const isManualMode = process.argv.includes(MANUAL_FLAG);
  const success = await (isManualMode ? runManual : runDoctor)();
  process.exit(success ? 0 : 1);
})();
