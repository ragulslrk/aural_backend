const express=require('express')
const mongoose=require("mongoose") 
const app =express()

const cors = require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))
app.use(cors());
require("dotenv").config()


app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))
// mongodb+srv://ragulNolan:%23Ragul4444@cluster0.6qh9t.mongodb.net/aural?retryWrites=true&w=majority

//mongodb+srv://aural123:aural123@cluster0.pzftaho.mongodb.net/aural?retryWrites=true&w=majority    
mongoose.connect( 'mongodb+srv://ragulNolan:%23Ragul4444@cluster0.6qh9t.mongodb.net/aural?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
.then((res)=>{
    app.listen(process.env.PORT ||3232,()=>{
        console.log('this aural project ')
})
console.log('success aural project ')})
.catch((err)=>{console.log(err)})


app.get('/test',(req,res)=>{

    console.log('request  recieved');
    res.json({msg:'to frontend'})
})

//route  to  login  
const  login=require('./controller/login')
app.use(login)


//route  to  signup
const  signup=require('./controller/signup')
app.use(signup)


//route to patient 
const patient=require("./controller/patient")
app.use(patient)


//route to staff 
const staff= require("./controller/staff")
app.use(staff)


//route to deaprtment 
const department= require("./controller/department")
app.use(department)

//route to appointment  
const appointment= require("./controller/appointment")
app.use(appointment)
