import { Router } from "express"
import filterController from "../controllers/filter.controller.js"

const router = new Router()

router.get('/',filterController.getProducts)
router.get('/:productID',filterController.getProductByID)
router.get('/category/:category',filterController.getCategory)
router.get('/category/:category/:subcategory',filterController.getSubcategory)

export default router;