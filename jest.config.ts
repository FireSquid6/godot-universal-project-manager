import type { Config } from "jest";

const config: Config = {
  verbose: true,
  modulePathIgnorePatterns: ["<rootDir>/dist-electron/"],
};

export default config;
