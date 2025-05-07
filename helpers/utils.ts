import Logger from './logger';
import jwt from "jsonwebtoken";
import { TwoFACode, Validate2FAResult, JWTPayload, AccountResponse } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'B7wNrW1gfJ9pLvtkGYirtGJQrLNt6zbA';

const MAX_ATTEMPTS = 3;
const EXPIRATION_TIME = 60 * 1000;

const codes: TwoFACode[] = [];

// Función para limpiar códigos expirados
function cleanExpiredCodes() {
  const now = Date.now();
  const initialLength = codes.length;
  codes.splice(0, codes.length, ...codes.filter(c => now <= c.expiresAt));
  
  if (initialLength !== codes.length) {
    Logger.info(`Limpiados ${initialLength - codes.length} códigos 2FA expirados`);
  }
}

// Limpiar códigos cada 1 minuto
setInterval(cleanExpiredCodes, 1 * 60 * 1000);

export function generate2FACode(accountId: string): TwoFACode {
  // Limpiar códigos expirados antes de generar
  cleanExpiredCodes();
  
  const now = Date.now();
  
  // Verificar si ya existe un código válido para esta cuenta
  const existingCode = codes.find(c => c.accountId === accountId && now <= c.expiresAt);
  if (existingCode) {
    Logger.warn(`Código 2FA ya existe para cuenta: ${accountId}`);
    return existingCode;
  }
  
  const code = Math.floor(100000 + Math.random() * 900000).toString();
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

export async function generateJwtToken(account: AccountResponse): Promise<string> {
  Logger.info(`Generando JWT para cuenta: ${account.id}`);

  if (!account) {
    throw new Error('Cuenta inactiva');
  }

  const payload: JWTPayload = {
    sub: account.id,
    email: account.email,
    firstName: account.firstName,
    lastName: account.lastName
  };

  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    Logger.error(`Error generando JWT: ${error}`);
    throw error;
  }
}