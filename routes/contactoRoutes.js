import express from "express"
import { 
    registrarContacto, 
    mostrarContacto, 
    mostrarOneContact,
    deleteContact,
    editContact
} from "../controller/contactoController.js";
const router = express.Router()

router.get('/', mostrarContacto)
router.get('/:id', mostrarOneContact)
router.post('/', registrarContacto)
router.delete('/:id', deleteContact)
router.put("/:id", editContact)

export default router;