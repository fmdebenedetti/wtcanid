import { describe, it, expect, jest } from '@jest/globals';
import { beforeEach } from 'node:test';

const mockAuthMethods = {
  login: jest.fn<Promise<{ id: string }>, [string, string]>().mockResolvedValue({ id: 'accid' }),
  hashPassword: jest.fn<Promise<string>, [string]>().mockResolvedValue('hashed'),
  registerAccount: jest.fn<Promise<{ insertedAccount: { id: string } }>, [string, string, string, string, string]>().mockResolvedValue({ insertedAccount: { id: 'z' } }),
  registerPracticeAccount: jest.fn<Promise<{ insert_practice_accounts_one: { id: string } }>, [string, string, string, string, boolean, boolean, string, string, string, string, string, string]>().mockResolvedValue({ insert_practice_accounts_one: { id: 'y' } }),
  associatePracticeAccount: jest.fn<Promise<{ insert_practice_accounts_one: { id: string } }>, [string, string, string, string, string, string, string, boolean, boolean]>().mockResolvedValue({ insert_practice_accounts_one: { id: 'w' } }),
  changePassword: jest.fn<Promise<{ update_accounts_by_pk: { id: string } }>, [string, string]>().mockResolvedValue({ update_accounts_by_pk: { id: 'accid' } }),
  getAccountById: jest.fn<Promise<{ id: string }>, [string]>().mockResolvedValue({ id: 'accid' }),
  getPracticeByHandler: jest.fn<Promise<string>, [string]>().mockResolvedValue('practiceId'),
  accountByPracticeAccount: jest.fn<Promise<{ practiceAccount: { accountId: string } }>, [string]>().mockResolvedValue({ practiceAccount: { accountId: 'accid' } })
};
const mockLogger = { info: jest.fn(), error: jest.fn() };

jest.mock('../../../services/auth/auth.methods', () => mockAuthMethods);
jest.mock('../../../helpers/logger', () => mockLogger);
jest.mock('../../../helpers/utils', () => ({
  generate2FACode: jest.fn(() => ({ code: '123456' })),
  validate2FACode: jest.fn(() => ({ status: 'valid' })),
  generateJwtToken: jest.fn(() => 'token')
}));

const authService = require('../../../services/auth/auth.service');

describe('authService actions', () => {
  const ctx: any = { params: {}, meta: {} };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('login - éxito', async () => {
    ctx.params = { email: 'a@b.com', password: 'pass' };
    mockAuthMethods.login.mockResolvedValue({ id: 'accid' });
    const result = await (authService as any).actions.login.handler(ctx);
    expect(result).toEqual({ message: 'Código 2FA generado', accountId: 'accid' });
    expect(mockAuthMethods.login).toHaveBeenCalled();
  });

  it('validate2FA - válido', async () => {
    ctx.params = { accountId: 'id', code: '123456' };
    mockAuthMethods.getAccountById.mockResolvedValue({ id: 'id' });
    const result = await (authService as any).actions.validate2FA.handler(ctx);
    expect(result).toHaveProperty('token');
    expect(mockAuthMethods.getAccountById).toHaveBeenCalledWith('id');
  });

  it('registerAccount', async () => {
    ctx.params = { email: 'a@b.com', password: 'pass', firstName: 'n', lastName: 'a', npi: 'x' };
    mockAuthMethods.hashPassword.mockResolvedValue('hashed');
    mockAuthMethods.registerAccount.mockResolvedValue({ insertedAccount: { id: 'z' } });
    const result = await (authService as any).actions.registerAccount.handler(ctx);
    expect(result).toEqual({ insertedAccount: { id: 'z' } });
    expect(mockAuthMethods.registerAccount).toHaveBeenCalled();
  });

  it('registerPracticeAccount', async () => {
    ctx.params = { handler: 'h', position: 'p', profile: 'pr', title: 't', pcp: true, suspended: false, role: 'r', email: 'e', password: 'pass', firstName: 'n', lastName: 'a', npi: 'x' };
    mockAuthMethods.hashPassword.mockResolvedValue('hashed');
    mockAuthMethods.registerPracticeAccount.mockResolvedValue({ insert_practice_accounts_one: { id: 'y' } });
    const result = await (authService as any).actions.registerPracticeAccount.handler(ctx);
    expect(result).toEqual({ insert_practice_accounts_one: { id: 'y' } });
    expect(mockAuthMethods.registerPracticeAccount).toHaveBeenCalled();
  });

  it('associatePracticeAccount', async () => {
    ctx.params = { accountId: 'aid', practiceId: 'pid', firstName: 'n', lastName: 'a', npi: 'x', title: 't', role: 'r', pcp: true, suspended: false };
    mockAuthMethods.associatePracticeAccount.mockResolvedValue({ insert_practice_accounts_one: { id: 'w' } });
    const result = await (authService as any).actions.associatePracticeAccount.handler(ctx);
    expect(result).toEqual({ insert_practice_accounts_one: { id: 'w' } });
    expect(mockAuthMethods.associatePracticeAccount).toHaveBeenCalled();
  });

  it('changePassword', async () => {
    ctx.params = { password: 'nueva', session_variables: { 'x-hasura-user-id': 'accid' } };
    mockAuthMethods.changePassword.mockResolvedValue({ update_accounts_by_pk: { id: 'accid' } });
    const result = await (authService as any).actions.changePassword.handler(ctx);
    expect(result).toEqual({ responseCode: 200 });
    expect(mockAuthMethods.changePassword).toHaveBeenCalled();
  });
});
