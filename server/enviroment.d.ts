declare namespace NodeJS {
  interface ProcessEnv {
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    MONGODB_CONNECT_STRING: string;
    FRONTEND_ENDPOINT: string;
  }
}
