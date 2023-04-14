export interface httpLoggerArgs {
  format: string;
  level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
}
