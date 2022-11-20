import { Response, Request, NextFunction } from 'express'
import JTW from 'jsonwebtoken'

export function Private(req: Request, res: Response, next: NextFunction) {
  // fazer verificação de auth

  if (req.headers.authorization) {
    const [authtype, token] = req.headers.authorization.split(' ')
    if (authtype === 'Bearer') {
      try {
        JTW.verify(token, process.env.JWT_SECRET_KEY as string)

        next()
      } catch (error) {
        console.log('error no jwt')
      }
    }
  } else {
    return res.json({ error: 'Não autorizado' })
  }
}
