import { Router } from "express";
import chatController from "../controllers/chat.controller.js"

const router = new Router();

router.get('/',chatController.getChat);

export default router;
