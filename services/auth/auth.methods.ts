import bcrypt from "bcrypt";
import { GraphQLClient } from "graphql-request";
import Logger from '../../helpers/logger';
import { UUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { AccountResponse, GraphQLAccountResponse, PracticeAccountResponse } from '../../helpers/types';
import { ACCOUNT_QUERY_BY_EMAIL, ACCOUNT_QUERY_BY_ID, ACCOUNT_BY_PRACTICE_ACCOUNT, ASSOCIATE_PRACTICE_ACCOUNT_MUTATION, REGISTER_ACCOUNT_MUTATION, REGISTER_PRACTICE_ACCOUNT_MUTATION, UPDATE_ACCOUNT_PASSWORD_MUTATION, PRACTICE_BY_HANDLER } from '../../helpers/gql-querys';

const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql';
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'FdEezvp4EQtgjq4aLUt3rsEzJF4cbbN5';
const JWT_SECRET = process.env.JWT_SECRET || 'B7wNrW1gfJ9pLvtkGYirtGJQrLNt6zbA';

const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
  headers: {
    'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
  }
});

const authMethods = {
  async hashPassword(password: string): Promise<string> {
    Logger.info('Hashing password');
    return bcrypt.hash(password, 10);
  },

  async login(email: string, password: string) {
    try {
      const data = await client.request<GraphQLAccountResponse>(ACCOUNT_QUERY_BY_EMAIL, { email });
      
      if (!data.practice_accounts || data.practice_accounts.length === 0) {
        throw new Error('Cuenta no encontrada');
      }

      if (data.practice_accounts[0].suspended) {
        throw new Error('Cuenta suspendida');
      }

      const account = data.practice_accounts[0].account;
      
      const isPasswordValid = await bcrypt.compare(password, account.password);
      
      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
      }

      return account;
    } catch (error) {
      Logger.error(`Error en login: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  async getAccountByEmail(email: string) : Promise<AccountResponse>{
    try {
      const data = await client.request<GraphQLAccountResponse>(ACCOUNT_QUERY_BY_EMAIL, { email });
      
      if (!data.practice_accounts || data.practice_accounts.length === 0) {
        throw new Error('Cuenta no encontrada');
      }

      if (data.practice_accounts[0].suspended) {
        throw new Error('Cuenta suspendida');
      }

      const account = data.practice_accounts[0].account;

      return account;
    } catch (error) {
      Logger.error(`Error en login: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  async getAccountById(accountId: UUID) : Promise<AccountResponse>{
    try {
      const data = await client.request<GraphQLAccountResponse>(ACCOUNT_QUERY_BY_ID, { accountId });
      
      if (!data.practice_accounts || data.practice_accounts.length === 0) {
        throw new Error('Cuenta no encontrada');
      }
      
      return data.practice_accounts[0].account;
    } catch (error) {
      Logger.error(`Error en login: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  async registerAccount(email: string, password: string, firstName: string, lastName: string, npi: string) {
    return client.request(REGISTER_ACCOUNT_MUTATION, { email, password, firstName, lastName, npi });
  },

  async registerPracticeAccount(
    handler: string, position: string, profile: string, title: string, pcp: boolean, suspended: boolean, role: string, email: string, password: string, firstName: string, lastName: string, npi: string
  ) {
    return client.request(REGISTER_PRACTICE_ACCOUNT_MUTATION, { handler, position, profile, title, pcp, suspended, role, email, password, firstName, lastName, npi });
  },

  async associatePracticeAccount(
    accountId: string, practiceId: string, firstName: string, lastName: string, npi: string, title: string, role: string, pcp: boolean, suspended: boolean
  ) {
    return client.request(ASSOCIATE_PRACTICE_ACCOUNT_MUTATION, { accountId, practiceId, firstName, lastName, npi, title, role, pcp, suspended });
  },

  async changePassword(practiceAccountId: string, plainPassword: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return client.request(UPDATE_ACCOUNT_PASSWORD_MUTATION, { practiceAccountId, password: hashedPassword });
  },

  async accountByPracticeAccount(practiceAccountId: string) : Promise<PracticeAccountResponse> {
    return client.request(ACCOUNT_BY_PRACTICE_ACCOUNT, { practiceAccountId });
  },

  async getPracticeByHandler(handler: string) : Promise<string> {
    return client.request(PRACTICE_BY_HANDLER, { handler });
  },

  async verify(token: string) : Promise<any> {
    return jwt.verify(token, JWT_SECRET);
  }
};

export default authMethods;
