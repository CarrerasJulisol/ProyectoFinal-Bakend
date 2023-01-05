import { Router } from "express";
import productsController from "../controllers/products.controller.js"

const router = new Router();

router.get('/add-products',productsController.formAddProducts);

router.post('/products',productsController.addProduct)

router.delete('/products',productsController.deleteProduct);

router.get('/update-product',productsController.formUpdateProduct);

router.post('/update-product',productsController.updateProduct);


router.get('/delete-product',productsController.formDeleteProduct);

export default router;