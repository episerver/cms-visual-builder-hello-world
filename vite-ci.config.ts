import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "scripts/communicationInjector.ts"),
      name: "communicationInjector", // Global variable name (for UMD/IIFE formats)
      fileName: "communicationInjector", // Output file name
      formats: ["umd"],
    },
    sourcemap: true,
    outDir: "public/scripts", // Output directory
    rollupOptions: {
      output: {
        // Ensure all generated files are in the correct directory
        assetFileNames: "[name].js",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
    },
  },
  esbuild: {
    tsconfigRaw: require("./tsconfig.communication.json"),
  },
});
