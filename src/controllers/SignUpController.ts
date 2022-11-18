import { Request, Response } from "express";
import { SignUpUser } from "../services/SignUp";
import JTW from "jsonwebtoken";

export const SignUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const newUser = await SignUpUser(username, password);

  if (newUser != "usuario ja cadastrado") {
    const token = JTW.sign(
      { username: newUser.username, password },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "24h" }
    );

    return res.json({ newUser, token });
  } else {
    return res.json({ newUser });
  }
};
