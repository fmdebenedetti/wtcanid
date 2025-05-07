import type { Context } from "moleculer";
import { generate2FACode, generateJwtToken, validate2FACode } from "../../helpers/utils";
import authMethods from "./auth.methods";
import Logger from "../../helpers/logger";
import { LoginParams, Validate2FAParams, LoginResponse, TokenResponse } from "../../helpers/types";
import { CustomError, ErrorResponse, ERROR_CODES, ERROR_MESSAGES } from "../../helpers/error-handler";

const authService = {
  name: "auth",
  actions: {
    login: {
      async handler(ctx: Context<LoginParams>): Promise<LoginResponse | ErrorResponse> {
          if (!ctx.params.email || !ctx.params.password) {
            throw new CustomError(ERROR_MESSAGES[ERROR_CODES.MISSING_FIELDS], ERROR_CODES.MISSING_FIELDS);
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(ctx.params.email)) {
            throw new CustomError(ERROR_MESSAGES[ERROR_CODES.INVALID_EMAIL_FORMAT], ERROR_CODES.INVALID_EMAIL_FORMAT);
          }
          
          try{
            const { email, password } = ctx.params;

            const account = await authMethods.login(email, password);
            const twoFACode = generate2FACode(account.id);
            
            // Simulación de envío de email
            Logger.info(`🔐 Código 2FA para ${email}: ${twoFACode.code}`);

            return {
              message: "Código 2FA generado",
              accountId: account.id
            };
          } catch (error) {
            throw new CustomError(error instanceof Error ? error.message : 'Error desconocido', ERROR_CODES.INVALID_CREDENTIALS);
          }
        }
    },
    validate2FA: {
      async handler(ctx: Context<Validate2FAParams>): Promise<TokenResponse | ErrorResponse> {
        const { accountId, code } = ctx.params;
    
        const result = validate2FACode(accountId, code);
    
        switch (result.status) {
          case "valid":
            const account = await authMethods.getAccountById(accountId);
            return { token: await generateJwtToken(account) };
          case "expired":
            throw new CustomError(result.message || "Código expirado", ERROR_CODES.INVALID_2FA_CODE);
          case "invalid":
            throw new CustomError(result.message || "Código inválido", ERROR_CODES.INVALID_2FA_CODE);
        }
      }
    },
    registerAccount: {
      async handler(ctx: Context<{ email: string; password: string; firstName?: string; lastName?: string; npi?: string }>): Promise<any> {
        const { email, password, firstName = "test", lastName = "test", npi = "123456789" } = ctx.params;
        const pass = await authMethods.hashPassword(password);
        return authMethods.registerAccount(email, pass, firstName, lastName, npi);
      }
    },
    registerPracticeAccount: {
      async handler(ctx: Context<{ handler: string; position: string; profile: string; title: string; pcp: boolean; suspended: boolean; role: string; email: string; password: string; firstName: string; lastName: string; npi: string }>): Promise<any> {
        const { handler, position, profile, title, pcp, suspended, role, email, password, firstName, lastName, npi } = ctx.params;
        const encryptedPass = await authMethods.hashPassword(password);

        const practiceId = await authMethods.getPracticeByHandler(handler);

        return authMethods.registerPracticeAccount(
          practiceId, position, profile, title, pcp, suspended, role, email, encryptedPass, firstName, lastName, npi
        );
      }
    },
    associatePracticeAccount: {
      async handler(ctx: Context<{ accountId: string; practiceId: string; firstName: string; lastName: string; npi: string; title: string; role: string; pcp: boolean; suspended: boolean }>): Promise<any> {
        const { accountId, practiceId, firstName, lastName, npi, title, role, pcp, suspended } = ctx.params;
        return authMethods.associatePracticeAccount(accountId, practiceId, firstName, lastName, npi, title, role, pcp, suspended);
      }
    },
    changePassword: {
      async handler(ctx: Context<{ password: string } & { session_variables: { [key: string]: string } }>): Promise<any> {
        const { password, session_variables } = ctx.params;
        const practiceAccountId = session_variables["x-hasura-user-id"];
        if (!practiceAccountId) {
          throw new CustomError("No se encontró el usuario en sesión", "NO_SESSION_USER");
        }

        const practiceAccount = await authMethods.accountByPracticeAccount(practiceAccountId);

        if (!practiceAccount) {
          throw new CustomError("Account not found", ERROR_CODES.ACCOUNT_NOT_FOUND);
        }

        const accountId = practiceAccount.practiceAccount.accountId;

        await authMethods.changePassword(accountId, password);
        return { responseCode: 200 };
      }
    },
    encrypt: {
      async handler(ctx: Context<{ password: string }>): Promise<string> {
        const { password } = ctx.params;
        return authMethods.hashPassword(password);
      }
    },
    verifyToken: {
      async handler(ctx: Context<{ token: string }>): Promise<any> {
        const { token } = ctx.params;
        return authMethods.verify(token);
      }
    }
  }
};

module.exports = authService;
