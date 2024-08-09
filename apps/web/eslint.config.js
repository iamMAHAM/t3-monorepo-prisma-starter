import baseConfig, { restrictEnvAccess } from "@tutoring/eslint-config/base";
import nextjsConfig from "@tutoring/eslint-config/nextjs";
import reactConfig from "@tutoring/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
