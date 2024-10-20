import { createLogger, format, transports } from 'winston';

const options = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

// for development environment
const devLogger = {
  format: format.combine(
    format.colorize({
      all: true,
    }),
    format.errors({ stack: true }),
    format.label({
      label: '[LOGGER]',
    }),
    format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    format.printf(
      (info) =>
        ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.stack || info.message}`,
    ),
  ),

  transports: [new transports.Console(options.console)],
};

// for production environment
const prodLogger = {
  format: format.combine(
    format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: 'combine.log',
      level: 'info',
    }),
  ],
};

// export log instance based on the current environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
