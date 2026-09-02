const Redis = require("ioredis");

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false, // Don't hang Express requests if Redis is unreachable
  retryStrategy(times) {
    const delay = Math.min(times * 200, 3000);
    return delay;
  },
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  // Silent connection warnings when operating in fallback mode
});

function isReady() {
  return redis.status === "ready";
}

/**
 * Get cached data by key
 */
async function getCache(key) {
  if (!isReady()) return null;
  try {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error(`Redis getCache error for key ${key}:`, err.message);
    return null;
  }
}

/**
 * Set cached data with TTL in seconds
 */
async function setCache(key, value, ttlSeconds = 600) {
  if (!isReady()) return false;
  try {
    const serialized = JSON.stringify(value);
    await redis.set(key, serialized, "EX", ttlSeconds);
    return true;
  } catch (err) {
    console.error(`Redis setCache error for key ${key}:`, err.message);
    return false;
  }
}

/**
 * Delete a specific key from cache
 */
async function delCache(key) {
  if (!isReady()) return false;
  try {
    await redis.del(key);
    return true;
  } catch (err) {
    console.error(`Redis delCache error for key ${key}:`, err.message);
    return false;
  }
}

/**
 * Invalidate all cache keys matching a pattern (e.g. "listings:all:*")
 */
async function clearCachePattern(pattern) {
  if (!isReady()) return false;
  try {
    let cursor = "0";
    do {
      const [nextCursor, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
      cursor = nextCursor;
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } while (cursor !== "0");
    return true;
  } catch (err) {
    console.error(`Redis clearCachePattern error for pattern ${pattern}:`, err.message);
    return false;
  }
}

/**
 * Acquire a distributed lock for concurrency control
 * Uses atomic SET with NX (only if not exists) and PX (ttl in milliseconds)
 */
async function acquireLock(lockKey, lockVal, ttlMs = 5000) {
  if (!isReady()) return true; // Fallback: allow request through if Redis is offline
  try {
    const result = await redis.set(lockKey, lockVal, "PX", ttlMs, "NX");
    return result === "OK";
  } catch (err) {
    console.error(`Redis acquireLock error for key ${lockKey}:`, err.message);
    return true;
  }
}

/**
 * Release a distributed lock safely using Lua script
 */
async function releaseLock(lockKey, lockVal) {
  if (!isReady()) return false;
  const luaScript = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  try {
    await redis.eval(luaScript, 1, lockKey, lockVal);
    return true;
  } catch (err) {
    console.error(`Redis releaseLock error for key ${lockKey}:`, err.message);
    return false;
  }
}

module.exports = {
  redis,
  getCache,
  setCache,
  delCache,
  clearCachePattern,
  acquireLock,
  releaseLock,
};
