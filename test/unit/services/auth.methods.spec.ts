import authMethods from '../../../services/auth/auth.methods.js';
// @ts-ignore
import bcrypt from 'bcrypt';

import { describe, it, expect, afterEach } from '@jest/globals';
import { jest } from '@jest/globals';

jest.mock('bcrypt');

type GraphQLResponse = {
  insert_accounts_one?: { id: string };
  update_accounts_by_pk?: { id: string };
  insert_practice_accounts_one?: { id: string };
};

const mockRequest = jest.fn<Promise<GraphQLResponse>, [{ query: string, variables: Record<string, unknown> }]>();

jest.mock('graphql-request', () => ({
  GraphQLClient: jest.fn(() => ({
    request: mockRequest
  }))
}));

describe('authMethods', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      // @ts-ignore
      bcrypt.hash.mockResolvedValue('hashed');
      
      const result = await authMethods.hashPassword('mipass');
      
      expect(result).toBe('hashed');
      expect(bcrypt.hash).toHaveBeenCalledWith('mipass', 10);
    });
  });

  describe('registerAccount', () => {
    it('should call the registration mutation', async () => {
      mockRequest.mockResolvedValue({ insert_accounts_one: { id: 'user123' } });

      const result = await authMethods.registerAccount(
        'test@example.com', 
        'password123', 
        'Nombre', 
        'Apellido', 
        'NPI123'
      );

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Nombre',
            lastName: 'Apellido',
            npi: 'NPI123'
          }
        })
      );

      expect(result).toEqual({ insert_accounts_one: { id: 'user123' } });
    });
  });

  describe('registerPracticeAccount', () => {
    it('should call the practice registration mutation', async () => {
      mockRequest.mockResolvedValue({ insert_practice_accounts_one: { id: 'practice123' } });

      const result = await authMethods.registerPracticeAccount(
        'handler', 'pos', 'profile', 'title', true, false, 'role', 'mail', 'pass', 'nombre', 'apellido', 'npi'
      );

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            handler: 'handler',
            pos: 'pos',
            profile: 'profile',
            title: 'title',
            active: true,
            verified: false,
            role: 'role',
            email: 'mail',
            password: 'pass',
            firstName: 'nombre',
            lastName: 'apellido',
            npi: 'npi'
          }
        })
      );

      expect(result).toEqual({ insert_practice_accounts_one: { id: 'practice123' } });
    });
  });

  describe('changePassword', () => {
    it('should change the password', async () => {
      // @ts-ignore
      bcrypt.hash.mockResolvedValue('nuevaContrasenaHasheada');
      mockRequest.mockResolvedValue({ update_accounts_by_pk: { id: '789' } });

      const result = await authMethods.changePassword('aid', 'nueva');

      expect(bcrypt.hash).toHaveBeenCalledWith('nueva', 10);

      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            aid: 'aid',
            password: 'nuevaContrasenaHasheada'
          }
        })
      );

      expect(result).toEqual({ update_accounts_by_pk: { id: '789' } });
    });
  });
});
