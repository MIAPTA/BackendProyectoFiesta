import Venta from "../model/Venta.js";
import Producto from "../model/Producto.js";

const registrarVenta = async (req, res) => {
    const { idProduct, idUser, nameProduct, cantidad, precioTotal, estado } = req.body;

    try {
        // Verificamos si el producto existe y si hay suficiente stock
        const producto = await Producto.findById(idProduct);
        if (!producto || producto.cantidad < cantidad) {
            return res.status(400).json({ msg: `No hay suficiente stock para el producto ${nameProduct}.` });
        }

        // Reducir el stock del producto
        producto.cantidad -= cantidad;
        await producto.save();

        // Crear nueva venta
        const nuevaVenta = new Venta({
            idProduct,
            idUser,
            nameProduct,
            cantidad,
            precioTotal,
            estado: estado || "Pagado",  // Asignar "Pagado" si no se pasa ningún estado
        });

        // Guardar la venta en la base de datos
        const ventaAlmacenada = await nuevaVenta.save();
        res.status(201).json(ventaAlmacenada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar la compra" });
    }
};

const mostrarVenta = async (req, res) => {
    try {
        const ventas = await Venta.find();
        res.json(ventas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener las ventas" });
    }
};

const mostrarOneVenta = async (req, res) => {
    const { id } = req.params;

    try {
        const venta = await Venta.findById(id);
        if (!venta) {
            return res.status(404).json({ msg: "La venta no existe." });
        }
        res.json(venta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener la venta" });
    }
};

const mostrarVentasbyUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const ventasUsuario = await Venta.find({ idUser: userId });

        if (ventasUsuario.length === 0) {
            return res.status(404).json({ msg: "No se encontraron ventas para este usuario." });
        }

        res.json(ventasUsuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al buscar ventas para este usuario." });
    }
};

const editVenta = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        const venta = await Venta.findOneAndUpdate({ _id: id }, { $set: newData }, { new: true });
        if (!venta) {
            return res.status(404).json({ msg: "La venta no existe." });
        }
        res.json({ message: "Venta actualizada exitosamente", venta });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar la venta" });
    }
};

export { registrarVenta, mostrarVenta, mostrarOneVenta, mostrarVentasbyUserId, editVenta };
