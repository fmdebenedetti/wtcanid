import { Errors } from 'moleculer';
import Logger from './logger';

export interface ErrorResponse {
  success: boolean;
  error: {
    code: any;
    message: string;
    details?: any;
    accountId?: string;
  };
}

export class CustomError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export function handleError(error: any): ErrorResponse {
  // Loguear el error completo para depuración
  Logger.error(`Error capturado: ${error}`);

  // Si ya es un CustomError, usamos sus propiedades
  if (error instanceof CustomError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    };
  }

  // Si es un MoleculerError, extraemos sus propiedades
  if (error instanceof Errors.MoleculerError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.data
      }
    };
  }

  // Para errores genéricos
  if (error instanceof Error) {
    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: error.message,
        details: error.stack
      }
    };
  }

  // Para cualquier otro tipo de error
  return {
    success: false,
    error: {
      code: 'UNEXPECTED_ERROR',
      message: String(error),
      details: null
    }
  };
}

// Constantes de códigos de error
export const ERROR_CODES = {
  // Errores de autenticación
  INVALID_CREDENTIALS: 'AUTH_001',
  ACCOUNT_NOT_FOUND: 'AUTH_002',
  ACCOUNT_SUSPENDED: 'AUTH_003',
  INVALID_2FA_CODE: 'AUTH_004',
  
  // Errores de validación
  MISSING_FIELDS: 'VALIDATION_001',
  INVALID_EMAIL_FORMAT: 'VALIDATION_002',
  
  // Errores de JWT
  JWT_GENERATION_ERROR: 'JWT_001',
  INACTIVE_ACCOUNT: 'JWT_002'
};

// Mensajes de error predefinidos
export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Credenciales inválidas',
  [ERROR_CODES.ACCOUNT_NOT_FOUND]: 'Cuenta no encontrada',
  [ERROR_CODES.ACCOUNT_SUSPENDED]: 'Cuenta suspendida',
  [ERROR_CODES.INVALID_2FA_CODE]: 'Código de verificación inválido',
  [ERROR_CODES.MISSING_FIELDS]: 'Campos obligatorios faltantes',
  [ERROR_CODES.INVALID_EMAIL_FORMAT]: 'Formato de correo electrónico inválido',
  [ERROR_CODES.JWT_GENERATION_ERROR]: 'Error al generar token de acceso',
  [ERROR_CODES.INACTIVE_ACCOUNT]: 'Cuenta inactiva'
};
