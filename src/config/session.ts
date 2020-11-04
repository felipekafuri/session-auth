import { SessionOptions } from 'express-session';
import { IN_PROD } from './app';


const halfHour = 1000 * 60 * 30;

export const {
    SESSION_SECRET = 'please keep this secret, mate',
    SESSION_NAME = 'felipe',
    SESSION_IDLE_TIMEOUT = halfHour
} = process.env;

export const SESSION_OPTIONS ={
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: Number(SESSION_IDLE_TIMEOUT),
    secure: IN_PROD,
    sameSite:true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}