import { Router } from "express";
import pruebaController from "../controllers/prueba.controller.js";

const router = new Router()


router.get('/prueba',pruebaController.getCategory)

export default router;