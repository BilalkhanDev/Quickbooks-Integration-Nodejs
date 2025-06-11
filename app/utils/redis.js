const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('ready', () => {
  console.log('✅ Redis is ready for commands');
});

let redisReady = false;

const connectRedis = async () => {
  if (!redisReady) {
    try {
      await redisClient.connect();
      redisReady = true;
      console.log('🔗 Redis connection established');
    } catch (err) {
      console.error('❌ Redis connection failed:', err);
      throw err;
    }
  }
};

const initializeRedis = async () => {
  await connectRedis();
};

const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_TIME_IN_SECONDS = 3600; // 1 hour
const LOGIN_ATTEMPT_TTL = 86400; // 24 hours

const incrementFailedAttempts = async (email) => {
  await connectRedis();
  const key = `login_attempts:${email}`;
  const blockTimeKey = `block_time:${email}`;
  const failedAttempts = await redisClient.incr(key);

  console.log(`[Redis] Failed attempts for ${email}: ${failedAttempts}`);

  if (failedAttempts === 1) {
    await redisClient.expire(key, LOGIN_ATTEMPT_TTL);
  }

  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Store as Unix timestamp
    console.log(`[Redis] Blocking user ${email} at ${currentTimestamp}`);
    await redisClient.set(`blocked:${email}`, 'true', { EX: BLOCK_TIME_IN_SECONDS });
    await redisClient.set(blockTimeKey, currentTimestamp);
  }

  return failedAttempts;
};

const isUserBlocked = async (email) => {
  await connectRedis();
  const isBlocked = await redisClient.get(`blocked:${email}`);
  const blockTimestamp = await redisClient.get(`block_time:${email}`);

  if (!isBlocked || !blockTimestamp) return false;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const elapsed = currentTimestamp - parseInt(blockTimestamp, 10);

  if (elapsed >= BLOCK_TIME_IN_SECONDS) {
    console.log(`[Redis] Unblocking ${email} after ${elapsed} seconds`);
    await resetFailedAttempts(email); // Cleanup
    return false;
  }

  console.log(`[Redis] ${email} still blocked. Time left: ${BLOCK_TIME_IN_SECONDS - elapsed}s`);
  return true;
};

const resetFailedAttempts = async (email) => {
  await connectRedis();
  console.log(`[Redis] Resetting failed attempts and block status for ${email}`);
  await redisClient.del(`login_attempts:${email}`);
  await redisClient.del(`blocked:${email}`);
  await redisClient.del(`block_time:${email}`);
};

module.exports = {
  initializeRedis,
  incrementFailedAttempts,
  isUserBlocked,
  resetFailedAttempts,
};
