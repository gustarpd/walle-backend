import { Request, Response } from "express";
import { getBalance } from "../services/Acount";

export const All = async (req: Request, res: Response) => {
  const { id } = req.params;

  const balance = await getBalance(id);

  if (!balance) {
    res.json({ error: "usuario não encontrado" });
  } else {
    res.json({ balance });
  }
};
