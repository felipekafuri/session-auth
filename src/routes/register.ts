import {Router} from 'express';
import { logIn } from '../auth';
import { catchAsync } from '../errors';
import { guest } from '../middleware/auth';
import { User } from '../models/User';
import registerSchema from '../validation/auth';
import { validate } from '../validation/joi';

const registerRouter = Router();

registerRouter.post('/register', guest, catchAsync(async (request, response)=>{
  await validate(registerSchema, request.body);

  const {email, password, name} = request.body;

  const emailExists = await User.exists({email});

  if(emailExists) {
    throw new Error('Invalid e-mail');
  }

  const user = await User.create({ email, password, name });
  
  logIn(request, user.id)

  return response.json(user);
}));

export default registerRouter;