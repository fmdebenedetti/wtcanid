// Utilidades para 2FA
import Logger from './logger';

/*
// EJEMPLO de integración con Redis para almacenar códigos 2FA
dejar comentado para referencia futura
import Redis from 'ioredis';
const redis = new Redis();

export async function save2FACodeToRedis(accountId: string, code: string, expiresInMs: number) {
  await redis.set(`2fa:${accountId}`, code, 'PX', expiresInMs);
}

export async function get2FACodeFromRedis(accountId: string): Promise<string | null> {
  return await redis.get(`2fa:${accountId}`);
}

export async function delete2FACodeFromRedis(accountId: string) {
  await redis.del(`2fa:${accountId}`);
}
// Fin ejemplo Redis
*/

export interface TwoFACode {
  code: string;
  accountId: string;
  expiresAt: number;
  attempts: number;
}

export interface Validate2FAResult {
  status: "valid" | "expired" | "invalid";
  attempts?: number;
  message?: string;
}

const MAX_ATTEMPTS = 3;
const EXPIRATION_TIME = 60 * 1000;

const codes: TwoFACode[] = [];

export function generate2FACode(accountId: string): TwoFACode {
  // Limpiar códigos expirados
  const now = Date.now();
  const validCodes = codes.filter(c => now <= c.expiresAt);
  
  // Verificar si ya existe un código válido para esta cuenta
  const existingCode = validCodes.find(c => c.accountId === accountId);
  if (existingCode) {
    Logger.warn(`Código 2FA ya existe para cuenta: ${accountId}`);
    return existingCode;
  }
  
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  const expiresAt = now + EXPIRATION_TIME;
  const twoFACode: TwoFACode = { 
    code, 
    accountId, 
    expiresAt,
    attempts: 0 
  };
  
  codes.push(twoFACode);
  Logger.info(`Generado código 2FA para cuenta: ${accountId}`);
  
  return twoFACode;
}

export function validate2FACode(accountId: string, code: string): Validate2FAResult {
  const now = Date.now();
  
  // Limpiar códigos expirados
  const validCodes = codes.filter(c => now <= c.expiresAt);
  
  const twoFACode = validCodes.find(c => 
    c.accountId === accountId && 
    c.code === code);

  if (!twoFACode) {
    // Verificar intentos para este accountId
    const attemptsCode = validCodes.find(c => c.accountId === accountId);
    
    if (attemptsCode) {
      attemptsCode.attempts++;
      
      if (attemptsCode.attempts >= MAX_ATTEMPTS) {
        Logger.warn(`Máximo de intentos alcanzado para cuenta: ${accountId}`);
        codes.splice(codes.indexOf(attemptsCode), 1);
        return { status: "expired", message: "Código expirado" };
      }
    }
    
    return { status: "invalid", message: "Código incorrecto" };
  }

  if (now > twoFACode.expiresAt) {
    // Eliminar el código expirado
    const codeIndex = codes.findIndex(c => c.accountId === accountId && c.code === code);
    if (codeIndex !== -1) {
      codes.splice(codeIndex, 1);
    }
    return { status: "expired", message: "Código expirado" };
  }

  // Eliminar el código después de validarlo
  const codeIndex = codes.findIndex(c => c.accountId === accountId && c.code === code);
  if (codeIndex !== -1) {
    codes.splice(codeIndex, 1);
  }

  return { status: "valid", message: "Código válido" };
}
