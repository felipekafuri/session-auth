import {Router} from 'express'
import { validate } from '../validation/joi'
import { loginSchema } from '../validation/auth'
import { catchAsync } from '../errors'
import { User } from '../models/User'
import { logIn, logOut } from '../auth'
import { auth, guest } from '../middleware/auth'

const loginRouter = Router()



loginRouter.post('/login',guest, catchAsync(async (request, response)=>{
  await validate(loginSchema, request.body)

  const { email, password } = request.body
  
  const user = await User.findOne({email})

  if(!user || !(await user.matchesPassword(password))){
    throw new Error('Incorrect email/password combination')
  }

  logIn(request, user.id)

  response.json({message: 'OK'})
}))

loginRouter.post('/logout', auth, catchAsync(async (request, response)=>{
  await logOut(request,response)

  response.json({message: 'OK'})
}))


export default loginRouter