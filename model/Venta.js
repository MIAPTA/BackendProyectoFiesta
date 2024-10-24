import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema(
    {
        idProduct:{
            type: String,
            required:true,
            trie:true,
        },
        idUser:{
            type: String,
            required: true,
            trie: true
        },
        nameProduct:{
            type: String,
            required:true,
            trie:true,
        },
        cantidad:{
            type: Number,
            required:true,
            trie:true
        },
        precioTotal:{
            type: Number,
            required:true,
            trie:true,
        },
        estado:{
            type: String,
            required:true,
            trie:true
        },
    },
    {
        timestamps:true,
    }
)

const venta = mongoose.model("Venta",userSchema)
export default venta;