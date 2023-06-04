const  route =require("express").Router()
const  user =require('../model/user')


route.post('/signup',(req,res)=>{
    console.log('this is signup')
    if(req.body.username && req.body.password && req.body.email)
    { user.findOne({username:req.body.username})
    .then(result=>{
      if(result)
      {
          res.sendStatus(403)

      }
      else{

      user.create(req.body)
      res.sendStatus(200)
      }
    })
    }
    else{
      res.send(500)
  }
  



})

module.exports=route