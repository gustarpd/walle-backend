import { Request, Response } from 'express'
import { getBalance } from '../services/AcountService'

export const All = async (req: Request, res: Response) => {
  const { id } = req.params

  const balance = await getBalance(id)

  if (!balance) {
    res.json({ error: 'usuário não encontrado' })
  } else {
    res.json( balance )
  }
}
