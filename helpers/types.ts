import { UUID } from "node:crypto";

export interface JWTPayload {
  sub: string;
  email: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

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

export interface AccountResponse {
  id: string;
  password: string;
  firstName: string;
  lastName: string;
  npi: string;
  email: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accountId: string;
}

export interface Validate2FAParams {
  accountId: UUID;
  code: string;
}

export interface TokenResponse {
  token: string;
}

export interface GraphQLAccountResponse {
  practice_accounts: {
    account: {
      id: string;
      password: string;
      firstName: string;
      lastName: string;
      npi: string;
      role: string;
      email: string;
    },
    practice:{
      id: string;
      handler: string;
    },
    suspended: boolean;
  }[];
}

export interface PracticeAccountResponse {
  practiceAccount: {
    accountId: string;
  };
}
