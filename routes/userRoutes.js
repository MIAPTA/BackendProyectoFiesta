import express from "express"
import checkAuth from "../middleware/checkAuth.js"
const router = express.Router()

import {
    registrar, 
    autenticar, 
    mostrar, 
    confirmar,
    restablecer,
    comprobarToken,
    nuevoPassword,
    perfil,
    mostrarOneUser,
    deleteUser,
    editUser,
} from "../controller/userController.js"

//Peticiones al Controller
router.post('/',registrar)
router.post('/login',autenticar) 
router.get('/confirmar/:token', confirmar)
router.post('/resetpassword', restablecer)
router.route('/resetpassword/:token').get(comprobarToken).post(nuevoPassword)
router.get('/',mostrar)
router.get('/:id', mostrarOneUser)
router.delete('/:id', deleteUser)
router.put("/:id", editUser)


//Peticiones al Controller usando middleware
router.get('/perfil', checkAuth, perfil)

export default router;