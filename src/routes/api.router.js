import { Router } from "express";
import apiController from "../controllers/api.controller.js"

const router = new Router();

router.get('/products',apiController.getAllProducts);
router.get('/messages',apiController.getChat);
router.get('/carts',apiController.getAllCarts);
router.get('/carts/:idCart',apiController.getCart);
router.delete('/product-form-cart/:id',apiController.deleteOneProduct);


export default router;