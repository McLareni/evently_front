interface ImportMetaEnv {
  readonly VITE_MOCK_API_USER_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
