const mongoose=require("mongoose")
const  user_schema= mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false

    },
    email:{
        type:String,
        required:false
    }
},{versionKey:false})



const  user_model=mongoose.model('users',user_schema)

module.exports=user_model