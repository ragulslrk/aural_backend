const mongoose=require("mongoose")
const  depart_schema=mongoose.Schema({
    department:{
        type:String,
        required:false
    },
    session_cost:{
        type:Number,
        required:false
    }
},{versionKey:false})
const  depart_model=mongoose.model('departments',depart_schema)
module.exports=depart_model
