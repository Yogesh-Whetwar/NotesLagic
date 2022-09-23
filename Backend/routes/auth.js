const express = require("express") 
const bcrypt=require("bcryptjs");
const router = express.Router();
const User = require('../models/User'); 
var fetchuser =require("../middleware/fetchuser")
const { body, validationResult } = require  ('express-validator');    
const Notes=require("../models/Notes")
var jwt = require('jsonwebtoken');
const JWT_SECRET="yogiisagoodboy";
//Crate a user using:POST "/api/auth" Doesnt require Auth NO login required  
//Route 1
router.post('/createuser', [
    body('name', 'Name must contain more than three letters').isLength({ min: 3 }), //adding validation
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must contain more than five letters').isLength({ min: 5 })
], async (req, res) => {
    //  console.og(req.body);  
    //  const user=User(req.body);  
    //  user.save();  
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success=false;
    //check whether the user this email exist already  
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email is already exists" })
        }    
        const salt=await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);
        //create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password:secPass,

        })  ; 
        const data={
            user:{
                id:user.id
            }
        }   
        success=true;
        const authtoken= jwt.sign(data,JWT_SECRET)
    //    console.log(jwtData);
        res.json({success,authtoken})
    } catch (error) {
        console.log(error.message); 
        success=false;
        res.status(500).send({success, message: "Some internal error"});
    }
})
 
//authenticate a user no login required  
//Route 2
router.post('/login', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password can not be empty').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }     
    let success=false;
  const {email,password}=req.body;
  try{
    
let user=await User.findOne({email});
if(!user){
    return res.status(400).json({error:"Please Try to login with correct credentials"})
}   
   const passwordCompare=await bcrypt.compare(password,user.password);
   if(!passwordCompare){
    return res.status(400).json({error:"Please Try to login with correct credentials"})
}     
const data={
    user:{
        id:user.id
    }
}  
const authtoken= jwt.sign(data,JWT_SECRET)
//    console.log(jwtData); 
success=true;
res.json({authtoken,success});
  }catch(error){
    console.log(error.message);
    res.status(500).send("Some INternal Server error")
  }

})   

//Route 3 get loggedin user details using /getuser  login required 
router.post('/getuser',fetchuser, async (req, res) => {
  try{
     const userId=req.user.id;
     const user=await User.findById (userId).select("-password") 
     res.send(user)
  }catch(error){
    console.log(error.message);
    res.status(500).send("Some INternal Server error")
  }

})      

//notes ka code bhi yhi likh rha  
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    // console.log("I am working")  
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some INternal Server error")
    }
})

//add a new note using post post /addnote login required
router.post('/addnote', fetchuser, [
    body('tittle', 'Enter Valid tittle').isLength({ min: 3 }), //adding validation
    // body(' description', 'Please enter a valid Description').isLength({ min: 3 }),
], async (req, res) => {
    try {
        console.log("working")  
        const { tittle, description, tag } = req.body;
        // console.log("I am working")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            tittle, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some INternal Server error")
    }

})   

//update an existing note using post /updatenote login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // console.log("I am working")  
    const { tittle, description, tag } = req.body; 
    //create a newNote object  
  
    const newNote={}
    if(tittle){
        
        newNote.tittle=tittle
    }  
    if(description){
        newNote.description=description
    }
    if(tag){
newNote.tag=tag
    }  

    //find the note to be updated  
   let note= await Notes.findById(req.params.id);
    if(!note){
       return  res.status(404).send("Not Found")
    }  
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed")
    }  
     note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

     res.json({note}) 

})
 

//delete a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // console.log("I am working")  
    const { tittle, description, tag } = req.body; 
    //find the note to be deleted 
   let note= await Notes.findById(req.params.id);
    if(!note){
       return  res.status(404).send("Not Found omg")
    }   
    //allow deletion only if user owns this note
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not Allowed to delete")
    }  
     note=await Notes.findByIdAndDelete(req.params.id)

     res.json({"success":"Note has been deleted",note:note}) 

})
module.exports = router