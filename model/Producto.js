import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema(
    {
        nombre:{
            type: String,
            required:true,
            unique:true,
            trie:true
        },
        imagen:{
            type: String,
            required:true,
            trim:true,
        },
        descripcion:{
            type: String,
            required:true,
            trie:true,
        },
        cantidad:{
            type: Number,
            required:true,
            trie:true,
        },
        precio:{
            type: Number,
            required:true,
            trie:true,
        },
        estado:{
            type: String,
            required:true,
        }
    },
    {
        timestamps:true,
    }
)

const producto = mongoose.model("Producto",userSchema)
export default producto;