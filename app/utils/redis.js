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

// Wrapper functions that handle connection automatically
const safeRedisGet = async (key) => {
  await connectRedis();
  return await redisClient.get(key);
};

const safeRedisSet = async (key, value, options = {}) => {
  await connectRedis();
  return await redisClient.set(key, value, options);
};

const safeRedisIncr = async (key) => {
  await connectRedis();
  return await redisClient.incr(key);
};

const safeRedisExpire = async (key, ttl) => {
  await connectRedis();
  return await redisClient.expire(key, ttl);
};

const safeRedisDel = async (...keys) => {
  await connectRedis();
  return await redisClient.del(...keys);
};

const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_TIME_IN_SECONDS = 3600; // 1 hour
const LOGIN_ATTEMPT_TTL = 86400; // 24 hours

const incrementFailedAttempts = async (email) => {
  const key = `login_attempts:${email}`;
  const blockTimeKey = `block_time:${email}`;

  const failedAttempts = await safeRedisIncr(key);
  console.log(`[Redis] Failed attempts for ${email}: ${failedAttempts}`);

  if (failedAttempts === 1) {
    await safeRedisExpire(key, LOGIN_ATTEMPT_TTL);
  }

  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    console.log(`[Redis] Blocking user ${email} at ${currentTimestamp}`);
    await safeRedisSet(`blocked:${email}`, 'true', { EX: BLOCK_TIME_IN_SECONDS });
    await safeRedisSet(blockTimeKey, currentTimestamp.toString());
  }

  return failedAttempts;
};

const isUserBlocked = async (email) => {
  const isBlocked = await safeRedisGet(`blocked:${email}`);
  const blockTimestamp = await safeRedisGet(`block_time:${email}`);

  if (!isBlocked || !blockTimestamp) return false;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const elapsed = currentTimestamp - parseInt(blockTimestamp, 10);

  if (elapsed >= BLOCK_TIME_IN_SECONDS) {
    console.log(`[Redis] Unblocking ${email} after ${elapsed} seconds`);
    await resetFailedAttempts(email);
    return false;
  }

  console.log(`[Redis] ${email} still blocked. Time left: ${BLOCK_TIME_IN_SECONDS - elapsed}s`);
  return true;
};

const resetFailedAttempts = async (email) => {
  console.log(`[Redis] Resetting failed attempts and block status for ${email}`);
  await safeRedisDel(`login_attempts:${email}`, `blocked:${email}`, `block_time:${email}`);
};

const checkRedisForFleetData = async (fleetId) => {
  const redisKey = `fleetSpec:${fleetId}`;
  const cachedData = await safeRedisGet(redisKey);
  
  console.log("Cached Data", cachedData, fleetId);
  
  if (cachedData) {
    console.log("Cache hit. Returning data from Redis...");
    return JSON.parse(cachedData);
  }

  console.log("Cache miss. No data found in Redis.");
  return null;
};

const setFleetSpecToRedis = async (fleetId, data) => {
  const redisKey = `fleetSpec:${fleetId}`;
  await safeRedisSet(redisKey, JSON.stringify(data), { EX: 60 * 5 });
};

// Cache fleet data with automatic connection handling
const cacheFleetData = async (token, data) => {
  const redisKey = `fleets:${token}`;
  try {
    await safeRedisSet(redisKey, JSON.stringify(data), { EX: 60 * 5 });
    console.log(`Fleet data cached in Redis with key: ${redisKey}`);
    return true;
  } catch (error) {
    console.error('Failed to cache fleet data:', error.message);
    return false;
  }
};

// Get cached fleet data with automatic connection handling
const getCachedFleetData = async (token) => {
  const redisKey = `fleets:${token}`;
  try {
    const cachedData = await safeRedisGet(redisKey);
    if (cachedData) {
      console.log('Cache hit for fleet data');
      return JSON.parse(cachedData);
    }
    console.log('Cache miss for fleet data');
    return null;
  } catch (error) {
    console.error('Failed to get cached fleet data:', error.message);
    return null;
  }
};
const addFleetIdToRedis = async (fleetId) => {
  const key = 'fleetIds';
  await connectRedis();
  await redisClient.sAdd(key, fleetId);
};

const getAllFleetIdsFromRedis = async () => {
  const key = 'fleetIds';
  await connectRedis();
  return await redisClient.sMembers(key);
};
module.exports = {
  redisClient,
  initializeRedis,
  connectRedis,
  incrementFailedAttempts,
  checkRedisForFleetData,
  setFleetSpecToRedis,
  isUserBlocked,
  resetFailedAttempts,
  // Safe wrapper functions
  safeRedisGet,
  safeRedisSet,
  safeRedisIncr,
  safeRedisExpire,
  safeRedisDel,
  // Fleet-specific functions
  cacheFleetData,
  getCachedFleetData,
  addFleetIdToRedis,
  getAllFleetIdsFromRedis
};