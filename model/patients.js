const mongoose=require("mongoose")
const patients_schema= mongoose.Schema({
    patient_name:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        enum:["male","female","others"]

    },
    dob:{
        type:String,
        required:false
    },
    father_name:{
        type:String,
        required:false
    },
    mother_name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    phono:{
        type:Number,
        required:false
    },
    occupation:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    balance:{
        type:Number,
        required:false
    },
    cost_session:{
        type:Number,
        required:false
    }
},{versionKey:false})

const  patient_model=mongoose.model('patients',patients_schema)

module.exports=patient_model