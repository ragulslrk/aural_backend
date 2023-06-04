const route =require("express").Router()
const appointment=require('../model/appointment')
const  department=require('../model/department')
const patient=require("../model/patients")

//add appointment  
route.post('/add_appointment',(req,res)=>{
    console.log(req.body)
    if(req.body.patient_name && req.body.staff_name && req.body.date && req.body.start_time && req.body.end_time &&  req.body.department){

//{start_time:{$lte:req.body.end_time},end_time:{$gte:req.body.end_time}}
        appointment.find({$or:[
            {$and:[
            {date:req.body.date},
            {staff_name:req.body.staff_name},
            {$or:[
                
            {$and:[{start_time:{$lte:req.body.start_time}},{end_time:{$gt:req.body.start_time}}]},
            {$and:[{start_time:{$lt:req.body.end_time}},{end_time:{$gte:req.body.end_time}}]}

                    ]}
        ]},

        {$and:[
            {date:req.body.date},
            {patient_name:req.body.patient_name},
            {$or:[
                
            {$and:[{start_time:{$lte:req.body.start_time}},{end_time:{$gt:req.body.start_time}}]},
            {$and:[{start_time:{$lt:req.body.end_time}},{end_time:{$gte:req.body.end_time}}]}

                    ]}
        ]}
    
    ]})
    .then(nil_appointment=>{
        console.log(nil_appointment.length)
        if(nil_appointment.length===0)
        {   
            const new_appointment=new appointment({
            patient_name:req.body.patient_name,
            staff_name:req.body.staff_name,
            date:req.body.date,
            start_time:req.body.start_time,
            end_time:req.body.end_time,
            department:req.body.department
        })
        new_appointment.save()
        .then(result=>{
            return res.sendStatus(200)
      
          })
          .catch(err=>{
            console.log(err)
        })
        }
        else{
            return res.sendStatus(401)
        }
    })
        
        
    }else{
        return res.sendStatus(401)

    }
})


route.get('/get_status',(req,res)=>{
    var date_full=new Date()

    var month=date_full.getMonth()<10?"0"+(date_full.getMonth()+1):date_full.getMonth()+1
    var date=date_full.getDate()<10?"0"+date_full.getDate():date_full.getDate()

    date_full=String(date_full.getFullYear())+"-"+String(month)+"-"+String(date)

    console.log(month,date,date_full)
    // appointment.find({date:date_full})
    // .then(result=>{
    //     console.log(result)
    // })

    appointment.aggregate([
        //MATCH STAGE
        {$match:{date:date_full}},
        //grouping stage
        {$group:{_id:"$status",total_status:{$sum:1}}},
        //SORT stage
        {$sort:{_id:1}},
        

    ])
    .then(result=>{
        console.log(result)
        res.send(result)
    })
})

route.get('/get_appointments',(req,res)=>{
    appointment.find({},{fees:0}).sort({_id:'desc'})
    .then(result=>{
        console.log(result.length)
        res.send(result)
    })
})

route.post('/change_status',(req,res)=>{
    console.log(req.body)
    if(req.body.id && req.body.status_type)
    {
        if(req.body.status_type === "check_out")
        {
            console.log('complex')
            appointment.findOne({_id:req.body.id})
            .then(data=>{
                console.log(data)
            if(data)
            {   
                    
                department.findOne({department:data.department})
                    .then(depart=>{
                        console.log(depart)
                        patient.findOne({patient_name:data.patient_name})
                        .then(pat=>{
                            console.log(pat)
                            //update process
                            data.status=req.body.status_type
                            data.fees=depart.session_cost
                            pat.balance=pat.balance-depart.session_cost
                            data.save()
                            .then(finish1=>{
                                pat.save()
                                .then(finish2=>{
                                    return res.sendStatus(200)

                                })
                            })
                        })
                    
                    })

                }
            })

            .catch(err=>{
                console.log(err)
            })

        }
        else{
            appointment.findOne({_id:req.body.id})
            .then(result=>{
                result.status=req.body.status_type
                result.save()
                .then(finish=>{
                        
                        return res.sendStatus(200)
                    
                })
            })
            .catch(err=>{
                console.log(err)
            })

        }
    }
    else{
        return res.sendStatus(401)
        
    }
})

route.post('/filter_appointments',(req,res)=>{
    console.log(req.body)
    appointment.find(req.body).sort({_id:'desc'})
    .then(result=>{
        return res.send(result)

    })
    .catch(err=>{
        console.log(err)
    })
})


route.get('/get_staff_appointments/:date',(req,res)=>{
    appointment.aggregate([
        //match stage
        {$match:{date:req.params.date}},
        {$group:{_id:"$staff_name",y:{$sum:1}}},
        { 
            $addFields: { x: "$_id" }
        },
          
        {$project:{
            _id:0,
            x:1,
            y:1

           
        }}
                
    ])
    .then(result=>{
        console.log(result)
        res.send(result)
    })
})

route.get('/get_status_chart/:date',(req,res)=>{
   
    
    appointment.aggregate([
        //MATCH STAGE
        {$match:{date:req.params.date}},
        //grouping stage
        {$group:{_id:"$status",y:{$sum:1}}},
       
        { 
            $addFields: { x: "$_id" }
        },
          
        {$project:{
            _id:0,
            x:1,
            y:1

           
        }}
        

    ])
    .then(result=>{
        console.log(result)
        res.send(result)
    })
})

route.get('/get_date_chart',(req,res)=>{
    appointment.aggregate([
        
        //grouping stage
        {$group:{_id:"$date",y:{$sum:1}}},
        {$sort:{_id:1}},
       
        { 
            $addFields: { x: "$_id" }
        },
          
        {$project:{
            _id:0,
            x:1,
            y:1

           
        }}
        

    ]).limit(5)
    .then(result=>{
        console.log(result)
        res.send(result)
    })
})
module.exports=route