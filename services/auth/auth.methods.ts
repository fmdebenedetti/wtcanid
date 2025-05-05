import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLClient, gql } from "graphql-request";
import Logger from '../../helpers/logger';
import { Account, UserRole } from '../../src/generated/graphql';

const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql';
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'FdEezvp4EQtgjq4aLUt3rsEzJF4cbbN5';
const JWT_SECRET = process.env.JWT_SECRET || 'B7wNrW1gfJ9pLvtkGYirtGJQrLNt6zbA';

// Interfaz para el payload del JWT
interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

// Consulta GraphQL para obtener la cuenta por email
// Tipo para la respuesta de GraphQL
interface GraphQLAccountResponse {
  practice_accounts: {
    account: {
      id: string;
      password: string;
      firstName: string;
      lastName: string;
      npi: string;
    }
  }[];
}

interface AccountResponse {
  id: string;
  password: string;
  firstName: string;
  lastName: string;
  npi: string;
}

const ACCOUNT_QUERY = gql`
  query GetAccount($email: String!) {
    practice_accounts(
      where: {
        account: { email: { _eq: $email } }
      }
    ) {
      account {
        id
        password
        firstName
        lastName
        npi
      }
    }
  }
`;

const authMethods = {
  async hashPassword(password: string): Promise<string> {
    Logger.info('Hashing password');
    return bcrypt.hash(password, 10);
  },

  async login(email: string, password: string) {
    const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    });

    try {
      const data = await client.request<GraphQLAccountResponse>(ACCOUNT_QUERY, { email });
      
      if (!data.practice_accounts || data.practice_accounts.length === 0) {
        throw new Error('Cuenta no encontrada');
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
    const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    });

    try {
      const data = await client.request<GraphQLAccountResponse>(ACCOUNT_QUERY, { email });
      
      if (!data.practice_accounts || data.practice_accounts.length === 0) {
        throw new Error('Cuenta no encontrada');
      }

      const account = data.practice_accounts[0].account;

      return account;
    } catch (error) {
      Logger.error(`Error en login: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  },

  async registerAccount(email: string, password: string, firstName: string, lastName: string, npi: string) {
    const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    });
    const REGISTER_ACCOUNT_MUTATION = gql`
      mutation RegisterAccount($email: String!, $password: String!, $firstName: String!, $lastName: String!, $npi: String) {
        insertedAccount: insert_accounts_one(object: {email: $email, password: $password, firstName: $firstName, lastName: $lastName, npi: $npi}) {
          id
        }
      }
    `;
    return client.request(REGISTER_ACCOUNT_MUTATION, { email, password, firstName, lastName, npi });
  },

  async registerPracticeAccount(
    handler: string, position: string, profile: string, title: string, pcp: boolean, suspended: boolean, role: string, email: string, password: string, firstName: string, lastName: string, npi: string
  ) {
    const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    });
    // Aquí deberías obtener el practiceId real usando handler, adaptando la lógica a tu modelo
    // Por simplicidad, lo dejamos como handler
    const REGISTER_PRACTICE_ACCOUNT_MUTATION = gql`
      mutation RegisterPracticeAccount(
        $handler: String!, $position: String!, $profile: String!, $title: String!, $pcp: Boolean!, $suspended: Boolean!, $role: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $npi: String!
      ) {
        insert_practice_accounts_one(object: {
          handler: $handler,
          position: $position,
          profile: $profile,
          title: $title,
          pcp: $pcp,
          suspended: $suspended,
          role: $role,
          email: $email,
          password: $password,
          firstName: $firstName,
          lastName: $lastName,
          npi: $npi
        }) {
          id
        }
      }
    `;
    return client.request(REGISTER_PRACTICE_ACCOUNT_MUTATION, { handler, position, profile, title, pcp, suspended, role, email, password, firstName, lastName, npi });
  },

  async associatePracticeAccount(
    accountId: string, practiceId: string, firstName: string, lastName: string, npi: string, title: string, role: string, pcp: boolean, suspended: boolean
  ) {
    const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    });
    const ASSOCIATE_PRACTICE_ACCOUNT_MUTATION = gql`
      mutation AssociatePracticeAccount(
        $accountId: uuid!, $practiceId: uuid!, $firstName: String!, $lastName: String!, $npi: String!, $title: String!, $role: String!, $pcp: Boolean!, $suspended: Boolean!
      ) {
        insert_practice_accounts_one(object: {
          accountId: $accountId,
          practiceId: $practiceId,
          firstName: $firstName,
          lastName: $lastName,
          npi: $npi,
          title: $title,
          role: $role,
          pcp: $pcp,
          suspended: $suspended
        }) {
          id
        }
      }
    `;
    return client.request(ASSOCIATE_PRACTICE_ACCOUNT_MUTATION, { accountId, practiceId, firstName, lastName, npi, title, role, pcp, suspended });
  },

  async changePassword(practiceAccountId: string, plainPassword: string) {
    const client = new GraphQLClient(HASURA_GRAPHQL_ENDPOINT, {
      headers: {
        'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET
      }
    });
    // Aquí deberías obtener el accountId real usando practiceAccountId
    // y luego actualizar la contraseña (adaptar a tu modelo y mutación)
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const UPDATE_ACCOUNT_PASSWORD_MUTATION = gql`
      mutation UpdateAccountPassword($practiceAccountId: uuid!, $password: String!) {
        update_accounts_by_pk(pk_columns: {id: $practiceAccountId}, _set: {password: $password}) {
          id
        }
      }
    `;
    return client.request(UPDATE_ACCOUNT_PASSWORD_MUTATION, { practiceAccountId, password: hashedPassword });
  }

};

export default authMethods;

export async function generateJwtToken(account: Account): Promise<string> {
  Logger.info(`Generando JWT para cuenta: ${account.email}`);
  
  if (!account.isActive) {
    throw new Error('Cuenta inactiva');
  }

  const payload: JWTPayload = {
    sub: account.id,
    email: account.email,
    role: account.role,
    firstName: account.firstName || undefined,
    lastName: account.lastName || undefined
  };

  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h', // Token válido por 1 hora
      algorithm: 'HS256'
    });

    return token;
  } catch (error) {
    Logger.error(`Error generando JWT: ${error instanceof Error ? error.message : String(error)}`);
    throw new Error('Error generando token de autenticación');
  }
}
