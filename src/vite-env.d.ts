/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly WB_AGRIFOOD_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
