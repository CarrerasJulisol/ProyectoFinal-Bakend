import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import viewsController from "../controllers/views.controller.js";
import { publicValidation, privateValidation } from "../middlewares/auth.js";

const router = new Router();

router.get('/',privateValidation,viewsController.viewProducts);
router.get('/home',viewsController.viewHome);
router.post('/',privateValidation,cartsController.saveAtCart);

export default router;