import Contacto from "../model/Contacto.js";

const registrarContacto = async(req, res) => {
    const {email} =req.body
    const existecontacto = await Contacto.findOne({email})

    if(existecontacto)
    {
        const error = new Error("Contacto ya registrado")
        return res.status(400).json({ msg:error.message})
    }

    try {
        const contacto = new Contacto(req.body)
        const contactoAlmacenado = await contacto.save()
        res.json(contactoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const mostrarContacto = async(req, res) => {
    try {
        const contactos = await Contacto.find()
        res.json(contactos)
    } catch (error) {
        console.log(error)
    }
}

const mostrarOneContact = async (req, res) => {
    const { id } = req.params;

    try {
        const contacto = await Contacto.findOne({ _id: id });
        if (!contacto) {
            throw new Error("El Contacto no existe.");
        }
        res.json(contacto);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contactoEliminado = await Contacto.findByIdAndDelete(id);
        if (!contactoEliminado) {
            throw new Error("El contacto no existe.");
        }
        res.json({ message: "Contacto eliminado exitosamente" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

const editContact = async (req, res) =>{
    const { id } = req.params;
    const newData = req.body;

    try {
        const contacto = await Contacto.findOneAndUpdate({ _id: id }, { $set: newData }, { new: true });
        if (!contacto) {
        throw new Error("El contacto no existe.");
        }
        res.json({ message: "Contacto actualizado exitosamente", contacto });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

export {registrarContacto, mostrarContacto, mostrarOneContact, deleteContact, editContact}