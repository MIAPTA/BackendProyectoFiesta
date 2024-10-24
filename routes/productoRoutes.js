import express from "express"
import {
    registrarProduct, 
    mostrarProduct, 
    mostrarOneProduct, 
    deleteProduct, 
    editProduct
} from "../controller/productsController.js"
const router = express.Router()

router.get('/', mostrarProduct)
router.post('/', registrarProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', mostrarOneProduct)
router.put("/:id", editProduct)

export default router;