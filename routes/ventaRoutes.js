import express from "express"
import {
    registrarVenta, 
    mostrarVenta, 
    mostrarOneVenta,
    mostrarVentasbyUserId,
    editVenta,
} from "../controller/ventaController.js"
const router = express.Router()

router.get('/', mostrarVenta)
router.get('/:id', mostrarOneVenta)
router.get('/byUserId/:userId', mostrarVentasbyUserId)
router.post('/', registrarVenta)
router.put('/:id', editVenta)

// router.get("/",(req,res)=>{
//     res.json("Peticion Get Desde API/Usuario")
//     //json para envio de datos y send para enviar mensajes
// });

export default router;
