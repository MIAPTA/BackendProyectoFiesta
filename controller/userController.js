import Usuario from "../model/Usuario.js"
import generarId from "../helpers/generarid.js"
import generarjwt from "../helpers/generarjwt.js"

const registrar = async(req, res) => {

    const {email} =req.body
    const existeusuario = await Usuario.findOne({email})

    if(existeusuario)
    {
        const error = new Error("Usuario ya registrado.")
        return res.status(400).json({ msg:error.message})
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async(req, res) => {
    const {email, password} = req.body
    const usuario = await Usuario.findOne({email})
    
    if(!usuario)
    {
        const error = new Error("El usuario no existe.")
        return res.status(404).json({ msg:error.message})
    }

    if(!usuario.confirmado)
    {
        // const error = new Error("Para poder iniciar sesión con este Usuario, por favor haz clic en el enlace que se enviará al correo electrónico previamente proporcionado.")
        return res.status(403).json({ token:usuario.token })
    }

    if(await usuario.comprobarPassword(password))
    {
        res.json({  
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            tipoUsuario: usuario.tipoUsuario,
            token: generarjwt(usuario.id)
        })
    }
    else
    {
        const error = new Error("La contraseña es incorrecta.")
        return res.status(402).json({ msg:error.message})
    }
}

const mostrar = async(req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (error) {
        console.log(error)
    }
}

const mostrarOneUser = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findOne({ _id: id });
        if (!usuario) {
            throw new Error("El usuario no existe.");
        }
        res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmado = await Usuario.findOne({token});
    
    if(!usuarioConfirmado){
        const error = new Error("Token no valido.")
        return res.status(402).json({ msg:error.message})
    }
    try{
        usuarioConfirmado.confirmado = true
        usuarioConfirmado.token = ""
        await usuarioConfirmado.save();
        res.json({ msg: "Usuario Confirmado Correctamente."});
    }
    catch (error){
        console.log(error)
    }
}

const restablecer = async (req, res) =>{
    const { email } = req.body
    const usuario = await Usuario.findOne({email})

    if(!usuario)
    {
        const error = new Error("El usuario no existe.")
        return res.status(404).json({ msg:error.message})
    }
    
    try{
        usuario.token = generarId()
        await usuario.save()
        res.json({msg: "Hemos enviado un email con las instrucciones."})
    }catch (error){
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params
    const tokenValido = await Usuario.findOne({ token })
    
    if(tokenValido)
    {
        res.json({msg: "Token valido y el Usuario existe."})
    }
    else{
        const error = new Error("El Token no es valido.")
        return res.status(404).json({ msg:error.message})
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const usuario = await Usuario.findOne({token})

    if(usuario)
    {
        usuario.password=password
        usuario.token=""
        try {
            await usuario.save()
            res.json({msg: "La nueva contraseña fue modificada satisfactoriamente."})
        } catch (error) {
            console.log(error)
        }
        
    }
    else{
        const error = new Error("El Token no es valido.")
        return res.status(404).json({ msg:error.message})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        if (!usuarioEliminado) {
            throw new Error("El producto no existe.");
        }
        res.json({ message: "Producto eliminado exitosamente." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

const editUser = async (req, res) =>{
    const { id } = req.params;
    const newData = req.body;

    try {
        const usuario = await Usuario.findOneAndUpdate({ _id: id }, { $set: newData }, { new: true });
        if (!usuario) {
        throw new Error("El producto no existe.");
        }
        res.json({ message: "Producto actualizado exitosamente.", usuario });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    res.json(usuario)
}

export {registrar, autenticar, mostrar, mostrarOneUser, 
        confirmar, restablecer, comprobarToken, nuevoPassword, perfil, deleteUser, editUser}