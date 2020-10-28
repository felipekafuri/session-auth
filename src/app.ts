import express from 'express';
import { SESSION_OPTIONS } from './config';
import session, {Store} from 'express-session';
import registerRouter from './routes/register';
import { notFound, serverError } from './errors';



export const createApp = (store: Store)=>{
  const app = express();
  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  );

  app.use(registerRouter);
  
  app.use(notFound);

  app.use(serverError);
  
  return app;
}

