import winston from 'winston';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Niveles de log personalizados
const levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  trace: 5
};

const level = () => {
  const logLevel = process.env.LOG_LEVEL || 'info';
  return levels[logLevel] !== undefined ? logLevel : 'info';
};

// Colores para los niveles de log
const colors: { [key: string]: string } = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
  trace: 'cyan'
};

// Configuración del formato de log
const logFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info: any) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Crear logger
const Logger = winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Log a consola
    new winston.transports.Console(),
    
    // Log de errores a archivo
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true
    }),
    
    // Log combinado
    new winston.transports.File({
      filename: 'logs/combined.log',
      handleExceptions: true
    })
  ],
  exitOnError: false
});

// Extender métodos de log
(Logger as any).trace = (msg: string, ...meta: any[]) => {
  Logger.log('trace', msg, ...meta);
};

// Registrar colores personalizados
winston.addColors(colors);

// Manejar excepciones no capturadas
process.on('uncaughtException', (error) => {
  Logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Manejar rechazos de promesas no capturados
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export { Logger };

export default Logger;
