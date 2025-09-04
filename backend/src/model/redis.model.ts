import redisConfig from "../config/redis.config";

const redisClient = redisConfig.redisClient;

export const logoutAllDevices = async (userId: string) => {
  const pattern = `sess:*`; // prefix ของ session ใน Redis
  const keys = await redisClient.keys(pattern);

  for (const key of keys) {
    const sessionData = await redisClient.get(key);
    if (sessionData && sessionData.includes(`"userId":"${userId}"`)) {
      await redisClient.del(key);
    }
  }
};
