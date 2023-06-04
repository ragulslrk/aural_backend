const  mongoose=require('mongoose')
const  appointment_schema=mongoose.Schema({
    patient_name:{
        type:String,
        required:false
    },
    staff_name:{
        type:String,
        required:false
    },
    fees:{
        type:Number,
        required:false,
        default:0
    },
    department:{
        type:String,
        required:false
    },
    status:{
        type:String,
        enum:['not_started','check_in','engage','check_out','no_show'],
        default:'not_started'
    },
    date:{
        type:String,
        required:false

    },
    start_time:{
        type:Date,
        required:false

    },
    end_time:{
        type:Date,
        required:false

    }
},{versionKey:false})


const  appointment_model=mongoose.model('appointments',appointment_schema)
module.exports=appointment_model