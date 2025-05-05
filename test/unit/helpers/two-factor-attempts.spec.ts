import { describe, it, expect, jest } from '@jest/globals';
import { beforeEach } from 'node:test';

const mockRedis = {
  get: jest.fn<any, [string | null]>(),
  incr: jest.fn<any, [number]>(),
  expire: jest.fn<any, [boolean]>(),
  del: jest.fn<any, [number]>()
};

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => mockRedis);
});

const twoFactor = require('../../../helpers/two-factor-attempts');

describe('two-factor-attempts helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTwoFactorAttempts', () => {
    it('debería devolver 0 si no hay intentos', async () => {
      mockRedis.get.mockResolvedValue(null);
      const result = await twoFactor.getTwoFactorAttempts('id');
      expect(result).toBe(0);
    });
    it('debería devolver el número de intentos', async () => {
      mockRedis.get.mockResolvedValue('3');
      const result = await twoFactor.getTwoFactorAttempts('id');
      expect(result).toBe(3);
    });
  });

  describe('incrementTwoFactorAttempts', () => {
    it('debería incrementar y expirar el contador', async () => {
      mockRedis.incr.mockResolvedValue(4);
      mockRedis.expire.mockResolvedValue(true);
      const result = await twoFactor.incrementTwoFactorAttempts('id');
      expect(result).toBe(4);
      expect(mockRedis.incr).toHaveBeenCalledWith('2fa_attempts:id');
      expect(mockRedis.expire).toHaveBeenCalled();
    });
  });

  describe('resetTwoFactorAttempts', () => {
    it('debería borrar el contador', async () => {
      mockRedis.del.mockResolvedValue(1);
      await twoFactor.resetTwoFactorAttempts('id');
      expect(mockRedis.del).toHaveBeenCalledWith('2fa_attempts:id');
    });
  });
});
