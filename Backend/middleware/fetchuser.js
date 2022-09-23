  var jwt=require('jsonwebtoken') ;  
  const JWT_SECRET="yogiisagoodboy";
  const fetchuser=(req,res,next)=>{
    //get the user frombthe jwt token and add id to req object  

    const token=req.header('authtoken');
    if(!token){
        res.status(401).send({error:" token not found please authenticate using a vslid token"})
    }   
    try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next(); 
    }catch(error){  
        if(token){
        res.status(401).send({error:" catch error please authenticate using a vslid token"}) 
        } 
    }
  }

  module.exports= fetchuser