declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AMQP_URL: string;
    }
  }
}

export {};
