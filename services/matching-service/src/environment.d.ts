declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MATCH_REQUEST_TIMEOUT_MS: number;
      AMQP_URL: string;
    }
  }
}

export {};
