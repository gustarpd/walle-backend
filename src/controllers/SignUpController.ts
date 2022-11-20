import { Request, Response } from "express";
import { SignUpUser } from "../services/SignUpService";
import JTW from "jsonwebtoken";

export const SignUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const newUser = await SignUpUser(username, password);

  if (!newUser?.error) {
    const token = JTW.sign(
      { username: username, password },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "24h" }
    );

    return res.json({
      token,
      username: newUser?.username,
      userId: newUser?.id,
    });
  }

  return res.json({ message: newUser?.error });
};
