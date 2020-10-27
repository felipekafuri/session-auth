import express from 'express';
import { SESSION_OPTIONS } from './config';
import session, {Store} from 'express-session';

const app = express();
app.use(express.json());

export const createApp = (store: Store)=>{
  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  )
  
  app.get('/',(request, response)=>{
    return response.json({ok:true})
  })

  return app
}

