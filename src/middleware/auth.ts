import { NextFunction, Response, Request } from "express";
import { idLoggedIn } from "../auth";

export const guest = (request: Request, response: Response, next: NextFunction)=>{
  if(idLoggedIn(request)){
    throw new Error('You are algread ylogged in');
  }
  next();
}


export const auth = (request: Request, response: Response, next: NextFunction) =>{
  if(!idLoggedIn(request)){
    return next(new Error('You are not logged in'))
  }

  next()
}