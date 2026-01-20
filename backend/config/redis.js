const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  redisClient = redis.createClient({
    url: process.env.REDIS_URI || 'redis://localhost:6379',
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.on('connect', () => console.log('Redis Client Connected'));

  await redisClient.connect();
};

module.exports = { connectRedis, redisClient: () => redisClient };
