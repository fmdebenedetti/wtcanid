import { Context, Errors } from "moleculer";
const { MoleculerError } = Errors;

import { generate2FACode, validate2FACode } from "../../helpers/utils";
import authMethods from "./auth.methods";
import Logger from "../../helpers/logger";

interface LoginParams {
  email: string;
  password: string;
}

interface Validate2FAParams {
  accountId: string;
  code: string;
}

interface LoginResponse {
  message: string;
  accountId: string;
}

interface TokenResponse {
  token: string;
}

const authService = {
  name: "auth",
  actions: {
    login: {
      async handler(ctx: Context<LoginParams>, _meta?: any): Promise<LoginResponse> {
        // Validaciones de entrada
        if (!ctx.params.email || !ctx.params.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(ctx.params.email)) {
          throw new Error("Formato de email inválido");
        }

        try {
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
          Logger.error(`Error en login: ${error instanceof Error ? error.message : String(error)}`);
          throw new Error(error instanceof Error ? error.message : 'Error desconocido');
        }
      }
    },
    validate2FA: {
      async handler(ctx: Context<Validate2FAParams>, _meta?: any): Promise<{ success: boolean }> {
        const { accountId, code } = ctx.params;
    
        // Validar código 2FA solo en memoria
        const result = validate2FACode(accountId, code);
    
        switch (result.status) {
          case "valid":
            return { success: true };
          case "expired":
            throw new MoleculerError(result.message!, 400);
          case "invalid":
            throw new MoleculerError(result.message!, 400);
        }
      }
    },
    registerAccount: {
      async handler(ctx: Context<{ email: string; password: string; firstName?: string; lastName?: string; npi?: string }>): Promise<any> {
        const { email, password, firstName = "test", lastName = "test", npi = "123456789" } = ctx.params;
        const pass = await authMethods.hashPassword(password);
        // Suponiendo que existe un método registerAccount en authMethods
        return authMethods.registerAccount(email, pass, firstName, lastName, npi);
      }
    },
    registerPracticeAccount: {
      async handler(ctx: Context<{ handler: string; position: string; profile: string; title: string; pcp: boolean; suspended: boolean; role: string; email: string; password: string; firstName: string; lastName: string; npi: string }>): Promise<any> {
        const { handler, position, profile, title, pcp, suspended, role, email, password, firstName, lastName, npi } = ctx.params;
        const encryptedPass = await authMethods.hashPassword(password);
        // Aquí deberías obtener practiceId usando handler, adaptando la lógica a tu estructura actual
        // Por simplicidad, lo dejamos como handler, pero deberías consultar el practiceId real
        return authMethods.registerPracticeAccount(
          handler, position, profile, title, pcp, suspended, role, email, encryptedPass, firstName, lastName, npi
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
      async handler(ctx: Context<{ password: string } & { session_variables: { [key: string]: string } }>): Promise<{ responseCode: number }> {
        const { password, session_variables } = ctx.params;
        const practiceAccountId = session_variables["x-hasura-user-id"];
        if (!practiceAccountId) {
          throw new MoleculerError("No se encontró el usuario en sesión", 401, "NO_SESSION_USER");
        }
        try {
          // Aquí deberías obtener el accountId real usando practiceAccountId
          // y luego actualizar la contraseña (adaptar a tu lógica y métodos)
          await authMethods.changePassword(practiceAccountId, password.trim());
          return { responseCode: 200 };
        } catch (error: any) {
          Logger.error(`Error al actualizar la contraseña: ${error.message}`);
          throw new MoleculerError(error.message, 500, "CHANGE_PASSWORD_ERROR");
        }
      }
    }
  }
};

module.exports = authService;
