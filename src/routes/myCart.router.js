import { Router } from "express";
import cartController from '../controllers/carts.controller.js';
import { privateValidation } from "../middlewares/auth.js";

const router = Router();

router.get('/',privateValidation,cartController.myCart);
router.delete('/:id',cartController.removeFromCart);
router.post('/order',cartController.makeOrder)

/*
router.get('/agregarproductos',async(req,res)=>{
    let result = productos.forEach(producto=>{
        return services.ProductsServices.save(producto)
    });
    res.send(result)
})
*/

export default router;