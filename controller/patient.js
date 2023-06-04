const route =require('express').Router()
const patient=require("../model/patients")

// add patient to db 
route.post("/add_patient",(req,res)=>{
    console.log('in add  patient backend ')
    console.log(req.body)
    if(req.body.gender  && req.body.dob && req.body.patient_name && req.body.phono && req.body.email && req.body.father_name && req.body.mother_name && req.body.occupation  && req.body.address && req.body.cost_session  && req.body.balance)
  { 
    const  add_patient=new patient({
        gender:req.body.gender,
        dob:req.body.dob,
        patient_name:req.body.patient_name,
        phono:parseInt(req.body.phono),
        email:req.body.email,
        father_name:req.body.father_name,
        mother_name:req.body.mother_name,
        occupation:req.body.occupation,
        address:req.body.address,
        cost_session:parseInt(req.body.cost_session),
        balance:parseInt(req.body.balance)

    })
    add_patient.save()
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

route.get('/get_patient',(req,res)=>{

  patient.find({}).sort({_id:'desc'})
  .then(data=>{
  
      // console.log(data)
      res.send(data)
  })
  .catch(err=>{
      console.log(err)
  })
})

//route to get get info  by id 
route.get('/get_patient/:id',(req,res)=>{

  patient.findOne({_id:req.params.id})
  .then(data=>{
   
      // console.log(data)
      res.send(data)
  })
  .catch(err=>{
      console.log(err)
  })
})


//route to edit patient details 
route.post('/edit_patient',(req,res)=>{
  console.log('edit patient')
  console.log(req.body)
  if(req.body.gender  && req.body.dob && req.body.patient_name && req.body.phono && req.body.email && req.body.father_name && req.body.mother_name && req.body.occupation  && req.body.address && req.body.id)
  {
     patient.findOneAndUpdate({_id:req.body.id,patient_name:req.body.patient_name},
      {
        gender:req.body.gender,
        dob:req.body.dob,
        phono:parseInt(req.body.phono),
        email:req.body.email,
        father_name:req.body.father_name,
        mother_name:req.body.mother_name,
        occupation:req.body.occupation,
        address:req.body.address
      })
      .then(result=>{
        console.log(result,'in edit res');
        return res.sendStatus(200)

      })
      .catch(err=>{
        console.log(err)
      })
  }else{
    return res.sendStatus(401)

  }
})


//route to delete patient
route.post('/dele_patient',(req,res)=>{
  console.log('in  dele patient')
  console.log(req.body)
if(req.body.patient_name && req.body.id)
{
  patient.deleteOne({patient_name:req.body.patient_name,_id:req.body.id})
  .then(result=>{
    console.log(result)
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

//route to add amount
route.post('/add_amt',(req,res)=>{
  console.log('in add amount')
  console.log(req.body)
  if(req.body.amt && req.body.patient_name && req.body.id)
  {
    patient.findOne({patient_name:req.body.patient_name,_id:req.body.id})
    .then(result=>{
      var amt=parseInt(req.body.amt)
      result.balance=result.balance+amt
      result.save()
      .then(bal=>{
        return res.sendStatus(200)

      })
      
      .catch(err=>{
        console.log(err)
      })

    })
    .catch(err=>{
      console.log(err)
    })
  }
  else{
    return res.sendStatus(401)
  
  }
})
// get patient name only 
route.get('/get_patient_name',(req,res)=>{

  patient.find({},{patient_name:1}).sort({_id:'desc'})
  .then(data=>{
  
      // console.log(data)
      res.send(data)
  })
  .catch(err=>{
      console.log(err)
  })
})

module.exports=route