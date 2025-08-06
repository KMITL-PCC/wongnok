import {createClient} from "redis"
const RedisStore = require('connect-redis').default;

const redisClient = createClient({url: process.env.REDIS_URL})

// const client = (<unknown>redisClient) as Client

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect();
    console.log('Redis client connected successfully!');
})();

const sessionStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
})

export default {redisClient, sessionStore};