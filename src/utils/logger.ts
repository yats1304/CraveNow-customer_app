import {
  consoleTransport,
  logger as createLogger,
} from "react-native-logs";

const customConfig = {
  severity: __DEV__ ? "debug" : "error",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
      debug: "white",
    } as const,
  },
  async: true,
  dateFormat: "time",
  printDate: true,
  enabled: true,
};

const log = createLogger.createLogger(customConfig);

export const logger = {
  debug: (tag: string, message: string, ...args: any[]) => {
    log.debug(`[${tag}] ${message}`, ...args);
  },
  info: (tag: string, message: string, ...args: any[]) => {
    log.info(`[${tag}] ${message}`, ...args);
  },
  warn: (tag: string, message: string, ...args: any[]) => {
    log.warn(`[${tag}] ${message}`, ...args);
  },
  error: (tag: string, message: string, error?: any, ...args: any[]) => {
    if (error !== undefined) {
      log.error(`[${tag}] ${message}`, error, ...args);
    } else {
      log.error(`[${tag}] ${message}`, ...args);
    }
  },
};
