import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        nombre:{
            type: String,
            required:true,
            trie:true
        },
        email:{
            type: String,
            required:true,
            unique:true,
            trie:true,
        },
        phone:{
            type: Number,
            required:true,
            trie:true,
        },
        direccion:{
            type: String,
            required:true,
            trie:true,
        },
        password:{
            type: String,
            required:true,
            trie:true,
        },
        tipoUsuario:{
            type: String,
            required:true,
            trie:true,
        },
        token:{
            type: String,
        },
        confirmado:{
            type: Boolean,
            default:false
        },
    },
    {
        timestamps:true,
    }
)

// middleware
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

});

userSchema.methods.comprobarPassword = async function (passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
}

const usuario = mongoose.model("Usuario",userSchema)
export default usuario;