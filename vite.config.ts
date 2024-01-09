import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

export default defineConfig({
  envPrefix: "WB_AGRIFOOD_",
  envDir: "../",
  server: {
    port: 9000,
  },
  preview: {
    port: 9000,
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(
      execSync("git rev-parse --short HEAD").toString().trim()
    ),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [react()],
});
