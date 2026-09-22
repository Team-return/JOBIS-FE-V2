import { createViteConfig } from "../../vite.config.common";
import { name, version } from "./package.json";

export default createViteConfig({
  app: {
    name,
    version
  }
});
