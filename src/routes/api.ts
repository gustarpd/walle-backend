import { Router } from "express";

import * as AcountController from "../controllers/AcountController";

import * as CashOutController from "../controllers/CashOutController";

import * as LoginController from "../controllers/LoginController";
import * as FilterController from '../controllers/FilterController'

import * as SignUpController from "../controllers/SignUpController";
import { Private } from "../middlewares/middleware";

const router = Router();

router.get("/account/:id", Private, AcountController.All);

router.get("/account/filter/:id", Private, FilterController.Filter);

router.post("/cashout/:id", Private, CashOutController.cashout);

router.post("/login", LoginController.Login);
router.post("/signup", SignUpController.SignUp);

export default router;
