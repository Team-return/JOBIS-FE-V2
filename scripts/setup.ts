import process from "process";
import { execa } from "execa";
import { readFile } from "fs/promises";
import { logger } from "./shared";

const switchNodeVersion = async () => {
  try {
    const nodeVersion = (await readFile(".nvmrc", "utf-8")).trim();

    await execa("nvm", ["use", nodeVersion], { shell: true });
    logger.success(`Node ${nodeVersion} 활성화 완료`);
    return true;
  } catch (error) {
    logger.error("Node 버전 전환 실패", error);
    return false;
  }
};

const setupHusky = async () => {
  try {
    const { stdout } = await execa("yarn", ["prepare"]);
    if (stdout === ".git can't be found") {
      logger.error("Husky 초기화 실패: git 미사용중");
      return false;
    }
    logger.success("Husky 초기화 완료");
    return true;
  } catch (error) {
    logger.error("Husky 초기화 실패", error);
    return false;
  }
};

const installDependencies = async () => {
  try {
    await execa("yarn", ["install"]);
    logger.success("의존성 설치 완료");
    return true;
  } catch (error) {
    logger.error("의존성 설치 실패", error);
    return false;
  }
};

const runSetup = async () => {
  try {
    if (!(await switchNodeVersion())) return false;
    if (!(await installDependencies())) return false;
    if (!(await setupHusky())) return false;

    logger.success("모든 설정이 완료되었습니다");
    return true;
  } catch (error) {
    logger.error("설정 실패", error);
    return false;
  }
};

const success = await runSetup();
process.exit(success ? 0 : 1);
