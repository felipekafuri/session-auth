import { Request, Response } from 'express';
import { SESSION_NAME } from './config';

export const logIn = (request: Request,userId: string) =>{
  request.session!.userId = userId;
}

export const idLoggedIn = (request: Request) => {
  return !!request.session!.userId;
}


export const logOut = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err)

      res.clearCookie(SESSION_NAME)

      resolve()
    })
  })