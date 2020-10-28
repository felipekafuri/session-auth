import { Request } from 'express';

export const logIn = (request: Request,userId: string) =>{
  request.session!.userId = userId;
}

export const idLoggedIn = (request: Request) => {
  return !!request.session!.userId;
}