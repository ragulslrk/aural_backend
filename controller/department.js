const  route=require('express').Router()
const  department=require('../model/department')
//route to add department  
route.post("/add_department",(req,res)=>{
    console.log('in add department')
    console.log(req.body)
    if(req.body.department && req.body.session_cost){
        const  add_department=new department({
                department:req.body.department,
                session_cost:parseInt(req.body.session_cost)
        })
        add_department.save()
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

//route to get department data 
route.get('/get_department',(req,res)=>{
    department.find({})
    .then(data=>{
        console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
})


//route to get department info  by id 
route.get('/get_department/:id',(req,res)=>{

    department.findOne({_id:req.params.id})
    .then(data=>{
     
        // console.log(data)
        res.send(data)
    })
    .catch(err=>{
        console.log(err)
    })
  })



//route to edit department details 
route.post('/edit_department',(req,res)=>{
    console.log('edit department')
    console.log(req.body)
    if( req.body.department && req.body.session_cost && req.body.id)
    {
       department.findOneAndUpdate({_id:req.body.id},
        {
            session_cost:parseInt(req.body.session_cost)
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


  
  
module.exports=route