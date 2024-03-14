import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };
  return {
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
        execSync("git rev-parse --short HEAD").toString().trim(),
      ),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    plugins: [
      react(),
      {
        name: "plausible-script",
        transformIndexHtml(html) {
          return html.replace(
            "<plausible-script />",
            env.WB_AGRIFOOD_PLAUSIBLE_DOMAIN &&
              env.WB_AGRIFOOD_PLAUSIBLE_DOMAIN.length > 0
              ? `<script defer data-domain="${env.WB_AGRIFOOD_PLAUSIBLE_DOMAIN}" src="https://plausible.io/js/script.js"></script>`
              : "",
          );
        },
      },
    ],
  };
});
