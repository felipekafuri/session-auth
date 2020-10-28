import { ConnectionOptions } from 'mongoose';

const { 
  MONGO_HOST='localhost',
  MONGO_PORT=27017,
  MONGO_DATABASE='auth'
} = process.env


export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`

export const MONGO_OPTIONS:ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: MONGO_DATABASE
}