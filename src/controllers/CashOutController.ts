import { Request, Response } from "express";

import { CashOut } from '../services/CashTranferService'

export const cashout = async (req: Request, res: Response) => {
  const { value, UserNameCredited} = req.body;
  const { id } = req.params;

  const transaction = await CashOut(value, id, UserNameCredited);

  return res.json(transaction);
};
