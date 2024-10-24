import mongoose, { mongo } from "mongoose";

const contactoSchema = mongoose.Schema(
    {
        nombre:{
            type: String,
            required:true,
            trie:true
        },
        email:{
            type: String,
            required:true,
            trie:true,
        },
        phone:{
            type: Number,
            required:true,
            trie:true,
            unique:false
        },
        commentary:{
            type: String,
            required:false,
            trie:true,
        },
    },
    {
        timestamps:true,
    }
)

const contacto = mongoose.model("Contacto", contactoSchema)
export default contacto;