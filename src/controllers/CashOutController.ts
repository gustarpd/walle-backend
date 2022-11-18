import { Request, Response } from "express";
import { getBalance } from "../services/Acount";
import { CashOut } from "../services/CashIn";

export const cashout = async (req: Request, res: Response) => {
  const { value, UserNameCredited} = req.body;
  const { id } = req.params;

  const transaction = await CashOut(parseInt(value), id, UserNameCredited);

  return res.json(transaction);
};
