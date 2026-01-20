const { redisClient } = require('../config/redis');

const cache = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl || req.url;
    const client = redisClient();

    if (!client) {
      console.warn('Redis client not available, skipping cache');
       return next();
    }

    try {
      const cachedResponse = await client.get(key);
      if (cachedResponse) {
        console.log(`Redis Cache HIT: ${key}`);
        return res.json(JSON.parse(cachedResponse));
      } else {
        console.log(`Redis Cache MISS: ${key}`);
        res.originalSend = res.send;
        res.send = (body) => {
          res.originalSend(body);
          client.setEx(key, duration, body);
        };
        next();
      }
    } catch (error) {
      console.error('Redis Cache Error:', error);
      next();
    }
  };
};

module.exports = cache;
