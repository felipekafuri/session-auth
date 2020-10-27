import {RedisOptions} from 'ioredis'

const{
  REDIS_PORT = 6379,
  REDIS_HOST = 'localhost',
} = process.env

export const REDIS_OPTION:RedisOptions = {
  port: Number(REDIS_PORT),
  host: REDIS_HOST,
  db: 3
}