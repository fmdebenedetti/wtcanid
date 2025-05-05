import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

const TWO_FACTOR_ATTEMPTS_PREFIX = '2fa_attempts:';
const ATTEMPTS_EXPIRATION = 15 * 60; // 15 minutos

export async function getTwoFactorAttempts(accountId: string): Promise<number> {
  const key = `${TWO_FACTOR_ATTEMPTS_PREFIX}${accountId}`;
  const attempts = await redis.get(key);
  return attempts ? parseInt(attempts, 10) : 0;
}

export async function incrementTwoFactorAttempts(accountId: string): Promise<number> {
  const key = `${TWO_FACTOR_ATTEMPTS_PREFIX}${accountId}`;
  const attempts = await redis.incr(key);
  await redis.expire(key, ATTEMPTS_EXPIRATION);
  return attempts;
}

export async function resetTwoFactorAttempts(accountId: string): Promise<void> {
  const key = `${TWO_FACTOR_ATTEMPTS_PREFIX}${accountId}`;
  await redis.del(key);
}