export interface serverArgs {
  port: number;
  serverRestartDelay: number;
  maxRetryAttempts: number;
  retryAttemptsCount?: number;
}
