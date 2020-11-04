import {Router} from 'express'
import { catchAsync } from '../errors';
import { auth } from '../middleware/auth';
import { User } from '../models/User';

const homeRouter = Router();

homeRouter.get('/home', auth, catchAsync(async (request, response)=>{
 const user = await User.findById(request.session!.userId).select('-password -__v')


  response.json(user);
}))

export default homeRouter