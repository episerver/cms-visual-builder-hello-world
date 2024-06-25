import { CodegenConfig  } from '@graphql-codegen/cli'

const config : CodegenConfig = {
    schema: "https://staging.cg.optimizely.com/content/v2?auth=KSAzBegmYvXIKE3bEbechiYrYiPKsVyACWEt4cLQJFkSr3SD",
    documents: ["src/**/*.{ts,tsx}"],
    ignoreNoDocuments: true,
    generates: {
        './src/graphql/': {
            preset: 'client',
            plugins: [],
        }
    }
}

export default config