import { Request, Response } from 'express'
import { FindUser } from '../services/LoginService'

import JTW from 'jsonwebtoken'

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  const login = await FindUser(username, password)

  if (!login.comparePassword) {
    return res.json({ error: 'Usuario e/ou senha incorreta' })
  }

  if (login.comparePassword) {
    const token = JTW.sign(
      { username: username, password: password },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' },
    )

    return res.json({ token: token, user: login.user })
  }
}
