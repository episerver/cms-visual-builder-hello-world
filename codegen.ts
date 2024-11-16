import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const graphUrl = process.env.GRAPH_URL;
const graphSingleKey = process.env.GRAPH_SINGLE_KEY;

const config: CodegenConfig = {
  schema: `https://${graphUrl}/content/v2?auth=${graphSingleKey}`,
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/generated/graphql/": {
      preset: "client-preset",
    },
  },
};

export default config;
