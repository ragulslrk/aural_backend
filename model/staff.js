const  mongoose=require('mongoose')
const staff_schema=mongoose.Schema({
    staff_name:{
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
    specialization:{
        type:String,
        enum:['speech therapy','occupational therapy','special education'],
        
    },
    reg_no:{
        type:String,
        required:false}
    
},{versionKey:false})

const  staff_model=mongoose.model('staffs',staff_schema)

module.exports=staff_model