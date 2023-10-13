declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MATCH_REQUEST_TIMEOUT_MS: number;
    }
  }
}

export {};
