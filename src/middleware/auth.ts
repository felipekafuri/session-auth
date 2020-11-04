import { Request, Response, NextFunction } from 'express'
import { idLoggedIn, logOut } from '../auth'
import { SESSION_ABSOLUTE_TIMEOUT } from '../config'
import { catchAsync } from '../errors'

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (idLoggedIn(req)) {
    return next(new Error('You are already logged in'))
  }

  next()
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!idLoggedIn(req)) {
    return next(new Error('You must be logged in'))
  }

  next()
}

export const active  = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (idLoggedIn(req)) {
      const now = Date.now()
      const { createdAt } = req.session as Express.Session

      if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
        await logOut(req, res)

        return next(new Error('Session expired'))
      }
    }

    next()
  }
)