declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT_NUMBER: string;
    }
  }
}

export {};
