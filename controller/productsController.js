import Producto from "../model/Producto.js"

const registrarProduct = async(req, res) => {
    const {nombre} =req.body
    const existeusuario = await Producto.findOne({nombre})

    if(existeusuario)
    {
        const error = new Error("El producto ya existe.")
        return res.status(400).json({ msg:error.message})
    }
    
    try {
        const producto = new Producto(req.body)
        const productoAlmacenado= await producto.save()
        res.json(productoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const mostrarProduct = async(req, res) => {
    try {
        const producto = await Producto.find()
        res.json(producto)
    } catch (error) {
        console.log(error)
    }
}

const mostrarOneProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findOne({ _id: id });
        if (!producto) {
            throw new Error("El producto no existe.");
        }
        res.json(producto);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            throw new Error("El producto no existe.");
        }
        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

const editProduct = async (req, res) =>{
    const { id } = req.params;
    const newData = req.body;

    try {
        const producto = await Producto.findOneAndUpdate({ _id: id }, { $set: newData }, { new: true });
        if (!producto) {
        throw new Error("El producto no existe.");
        }
        res.json({ message: "Producto actualizado exitosamente", producto });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
    }
}

export {registrarProduct, mostrarProduct, mostrarOneProduct, deleteProduct, editProduct}