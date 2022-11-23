import express, {
  Request,
  Response,
  ErrorRequestHandler,
  Router,
} from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/api";
import { Private } from "./middlewares/middleware";

dotenv.config();

const server = express();

server.use(cors({
  origin: '*'
}))

server.use(express.json());

server.get("/ping"  ,(req: Request, res: Response) =>
  res.json({ ping: "pong" })
);

server.use(router);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400); // Bad Request
  console.log(err);
  res.json({ error: "Ocorreu algum erro." });
};
server.use(errorHandler);

server.listen(4000);
