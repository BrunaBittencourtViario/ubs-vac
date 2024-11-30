import express from "express";
import { validateLogin, createLogin, getUbs, getUbsWithVacinas,createFeedback,getFeedbacks  } from "../controllers/users.js";

const router = express.Router();

router.post("/login", validateLogin);
router.post("/register", createLogin);
router.get("/ubs", getUbs);
router.get("/ubsWithVacinas", getUbsWithVacinas);
router.post("/feedback", createFeedback);
router.get("/feedback", getFeedbacks);
export default router;