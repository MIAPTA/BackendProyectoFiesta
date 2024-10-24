// const express = require("express")
import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import cors from "cors"
import contactoRouters from "./routes/contactoRoutes.js"
import userRouters from "./routes/userRoutes.js"
import productoRoutes from "./routes/productoRoutes.js"
import ventaRoutes from "./routes/ventaRoutes.js"

dotenv.config();
connectdb();

const app = express();

// Aumentar el límite de tamaño de carga
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Configurar Cors
// Configurar Cors
const whitelist = [
    'http://localhost:5173',
    'https://exp.host'
];

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de Cors"));
        }
    }
};
/**const whitelist = ['http://localhost:5173'];
const corsOptions = {
    origin: function(origin, callback) {
        if (origin && whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de Cors"));
        }
    }
};
**/
app.use(cors(corsOptions));

//app.use(cors());


// Routing
app.use("/api/usuario", userRouters);
app.use("/api/producto", productoRoutes);
app.use("/api/venta", ventaRoutes);
app.use("/api/contacto", contactoRouters);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//mongodb+srv://u20212200826:20212200826@cluster0.fcwil.mongodb.net/db?