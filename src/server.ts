import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { REDIS_OPTION, APP_PORT,MONGO_URI, MONGO_OPTIONS } from './config';
import mongoose from 'mongoose';
import {createApp} from './app'

;import session from 'express-session';
(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

  const RedisStore = connectRedis(session)

  const client = new Redis(REDIS_OPTION)

  const store = new RedisStore({ client })

  const app = createApp(store);

  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
})()

