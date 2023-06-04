const route =require("express").Router()
const  staff=require("../model/staff")
// route to add patient  
route.post("/add_staff",(req,res)=>{
    console.log('in post')
    console.log(req.body)
    if(req.body.staff_name && req.body.phono && req.body.specialization && req.body.email && req.body.reg_no) 
    {
        staff.findOne({staff_name:req.body.staff_name,reg_no:req.body.reg_no})
        .then(result=>{
            if(result)
            {
                return res.json('Staff Already Exist.Try Again')

            }
            else{
                const add_staff=new staff({
                    staff_name:req.body.staff_name,
                    phono:parseInt(req.body.phono),
                    specialization:req.body.specialization,
                    email:req.body.email,
                    reg_no:req.body.reg_no

                })
                add_staff.save()
             return res.json('Saved Succesfully')


            }
        })
    }
    else{
    return res.sendStatus(401)
        
    }
})


route.get('/get_staff',(req,res)=>{
    staff.find({})
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

route.get('/get_staff_name',(req,res)=>{
    staff.find({},{staff_name:1})
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=route