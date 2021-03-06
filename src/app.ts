import express from 'express';
import { SESSION_OPTIONS } from './config';
import session, {Store} from 'express-session';
import registerRouter from './routes/register';
import { catchAsync, notFound, serverError } from './errors';
import loginRouter from './routes/longin';
import homeRouter from './routes/home';
import { active } from './middleware/auth';



export const createApp = (store: Store)=>{
  const app = express();
  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  );

  app.use(catchAsync(active))
  app.use(registerRouter);
  app.use(loginRouter);
  app.use(homeRouter);
  
  app.use(notFound);

  app.use(serverError);
  
  return app;
}

